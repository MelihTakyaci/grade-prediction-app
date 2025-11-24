#!/usr/bin/env python3
"""Simple prediction script.

Reads JSON from stdin. Expected formats:
 - { "features": [f1, f2, f3, ...] }

Based on the number of features, loads the appropriate model:
 - 1 feature (study hours OR attempts) → lin_reg.pkl (Simple Regression)
 - 2-3 features (study hours + attempts + optional class year) → multi_reg.pkl (Multiple Regression)

Prints JSON to stdout:
 { "prediction": 88.2 }
"""
import sys
import json
from pathlib import Path

try:
    import joblib
    import numpy as np
except Exception as e:
    print(json.dumps({"error": f"missing python dependency: {e}"}), file=sys.stderr)
    sys.exit(2)


def load_model_by_feature_count(feature_count):
    """Load appropriate model based on number of features."""
    here = Path(__file__).resolve().parent
    public_dir = here.parent / "public"
    
    # Select model based on feature count
    if feature_count == 1:
        # Simple regression: only 1 feature (study hours OR attempts)
        model_path = public_dir / "lin_reg.pkl"
        model_name = "Simple Regression (lin_reg.pkl)"
    elif feature_count >= 2:
        # Multiple regression: 2-3 features (study hours + attempts + optional class year)
        model_path = public_dir / "multi_reg.pkl"
        model_name = "Multiple Regression (multi_reg.pkl)"
    else:
        raise ValueError(f"Invalid feature count: {feature_count}")
    
    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")
    
    try:
        model = joblib.load(model_path)
        # Log which model was loaded (to stderr so it doesn't interfere with JSON output)
        print(f"Loaded {model_name} for {feature_count} feature(s)", file=sys.stderr)
        return model
    except Exception as e:
        # Try pickle as fallback
        import pickle
        with open(model_path, "rb") as fh:
            model = pickle.load(fh)
        print(f"Loaded {model_name} for {feature_count} feature(s) (via pickle)", file=sys.stderr)
        return model


def main():
    try:
        payload = json.load(sys.stdin)
    except Exception:
        print(json.dumps({"error": "invalid or empty JSON input"}), file=sys.stderr)
        sys.exit(3)

    # extract features
    if isinstance(payload, dict) and "features" in payload:
        features = payload["features"]
    else:
        # try named fields
        features = []
        for key in ("current_grade", "study_hours", "assignment_score"):
            if key in payload:
                features.append(payload[key])

    if not features:
        print(json.dumps({"error": "no features provided"}), file=sys.stderr)
        sys.exit(4)

    # Determine feature count and load appropriate model
    feature_count = len(features)
    try:
        model = load_model_by_feature_count(feature_count)
    except Exception as e:
        print(json.dumps({"error": f"failed to load model: {e}"}), file=sys.stderr)
        sys.exit(5)

    try:
        arr = np.array(features, dtype=float).reshape(1, -1)
        pred = model.predict(arr)
        # flatten
        val = float(pred[0])
        out = {"prediction": val}
        print(json.dumps(out))
    except Exception as e:
        print(json.dumps({"error": f"prediction failed: {e}"}), file=sys.stderr)
        sys.exit(6)


if __name__ == "__main__":
    main()

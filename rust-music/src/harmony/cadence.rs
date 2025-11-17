use wasm_bindgen::prelude::*;

/// カデンツの種類を判定（harmonyUtil.ts の cadenceText() に相当）
#[wasm_bindgen]
pub fn cadence_text(prev_functional_harmony: i32, functional_harmony: i32) -> String {
    if prev_functional_harmony == 5 && functional_harmony == 1 {
        "Perfect Cadence".to_string()
    } else if prev_functional_harmony == 4 && functional_harmony == 1 {
        "Plagal Cadence".to_string()
    } else if prev_functional_harmony == 5 && functional_harmony == 6 {
        "Deceptive Cadence".to_string()
    } else if functional_harmony == 5 {
        "Half Cadence".to_string()
    } else if functional_harmony == 7 {
        "Phrygian Cadence".to_string()
    } else {
        String::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cadence_text() {
        // V -> I = Perfect Cadence
        assert_eq!(cadence_text(5, 1), "Perfect Cadence");

        // IV -> I = Plagal Cadence
        assert_eq!(cadence_text(4, 1), "Plagal Cadence");

        // V -> VI = Deceptive Cadence
        assert_eq!(cadence_text(5, 6), "Deceptive Cadence");

        // ? -> V = Half Cadence
        assert_eq!(cadence_text(1, 5), "Half Cadence");
    }
}

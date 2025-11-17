use crate::scale::diatonic::create_diatonic_chord_map;
use crate::chord::get_interval;
use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// 機能和声のディグリー番号を取得（harmonyUtil.ts の getFunctionalHarmony() に相当）
#[wasm_bindgen]
pub fn get_functional_harmony(scale: &str, chord: &str) -> i32 {
    let chord_map = create_diatonic_chord_map();
    let empty_vec = vec![];
    let chords = chord_map.get(scale).unwrap_or(&empty_vec);

    if let Some(index) = chords.iter().position(|c| c == &chord) {
        (index + 1) as i32
    } else {
        0
    }
}

/// 機能和声のテキスト表示
#[wasm_bindgen]
pub fn functional_harmony_text(degree: i32) -> String {
    match degree {
        1 => "Ⅰ Tonic",
        2 => "Ⅱ Supertonic",
        3 => "Ⅲ Mediant",
        4 => "Ⅳ Subdominant",
        5 => "Ⅴ Dominant",
        6 => "Ⅵ Submediant",
        7 => "Ⅶ Leading Tone",
        _ => "",
    }
    .to_string()
}

/// 機能和声情報
#[wasm_bindgen]
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct HarmonyInfo {
    roman: String,
    desc: String,
}

#[wasm_bindgen]
impl HarmonyInfo {
    #[wasm_bindgen(getter)]
    pub fn roman(&self) -> String {
        self.roman.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn desc(&self) -> String {
        self.desc.clone()
    }
}

/// 音階度の情報を取得
#[wasm_bindgen]
pub fn functional_harmony_info(degree: i32) -> HarmonyInfo {
    match degree {
        1 => HarmonyInfo {
            roman: "Ⅰ".to_string(),
            desc: "Tonic (主音): 安心・落ち着き".to_string(),
        },
        2 => HarmonyInfo {
            roman: "Ⅱ".to_string(),
            desc: "Supertonic (上主音): 期待・問い".to_string(),
        },
        3 => HarmonyInfo {
            roman: "Ⅲ".to_string(),
            desc: "Mediant (中音): 穏やか・中間".to_string(),
        },
        4 => HarmonyInfo {
            roman: "Ⅳ".to_string(),
            desc: "Subdominant (下属音): 広がり・始まり".to_string(),
        },
        5 => HarmonyInfo {
            roman: "Ⅴ".to_string(),
            desc: "Dominant (属音): 緊張・推進".to_string(),
        },
        6 => HarmonyInfo {
            roman: "Ⅵ".to_string(),
            desc: "Submediant (下中音): 儚さ・哀愁".to_string(),
        },
        7 => HarmonyInfo {
            roman: "Ⅶ".to_string(),
            desc: "Leading Tone (導音): 不安・未解決".to_string(),
        },
        _ => HarmonyInfo {
            roman: "".to_string(),
            desc: "".to_string(),
        },
    }
}

/// トライアド和音のローマ数字表記情報
#[wasm_bindgen]
pub fn roman_numeral_harmony_info(degree: i32) -> HarmonyInfo {
    match degree {
        1 => HarmonyInfo {
            roman: "Ⅰ".to_string(),
            desc: "Tonic (主和音・長三和音): 安心・落ち着き".to_string(),
        },
        2 => HarmonyInfo {
            roman: "Ⅱm".to_string(),
            desc: "Supertonic (上主和音・短三和音): 期待・問い".to_string(),
        },
        3 => HarmonyInfo {
            roman: "Ⅲm".to_string(),
            desc: "Mediant (中和音・短三和音): 穏やか・中間".to_string(),
        },
        4 => HarmonyInfo {
            roman: "Ⅳ".to_string(),
            desc: "Subdominant (下属和音・長三和音): 広がり・始まり".to_string(),
        },
        5 => HarmonyInfo {
            roman: "Ⅴ".to_string(),
            desc: "Dominant (属和音・長三和音): 緊張・推進".to_string(),
        },
        6 => HarmonyInfo {
            roman: "Ⅵm".to_string(),
            desc: "Submediant (下中和音・短三和音): 儚さ・哀愁".to_string(),
        },
        7 => HarmonyInfo {
            roman: "Ⅶdim".to_string(),
            desc: "Leading Tone (導和音・減三和音): 不安・未解決".to_string(),
        },
        _ => HarmonyInfo {
            roman: "".to_string(),
            desc: "".to_string(),
        },
    }
}

/// 7thコードのローマ数字表記情報
#[wasm_bindgen]
pub fn roman_numeral_7th_harmony_info(degree: i32) -> HarmonyInfo {
    match degree {
        1 => HarmonyInfo {
            roman: "ⅠM7".to_string(),
            desc: "Tonic Seventh (主和音・長七の和音): 安心・落ち着き".to_string(),
        },
        2 => HarmonyInfo {
            roman: "Ⅱm7".to_string(),
            desc: "Supertonic Seventh (上主和音・短七の和音): 期待・問い".to_string(),
        },
        3 => HarmonyInfo {
            roman: "Ⅲm7".to_string(),
            desc: "Mediant Seventh (中和音・短七の和音): 穏やか・中間".to_string(),
        },
        4 => HarmonyInfo {
            roman: "ⅣM7".to_string(),
            desc: "Subdominant Seventh (下属和音・長七の和音): 広がり・始まり".to_string(),
        },
        5 => HarmonyInfo {
            roman: "Ⅴ7".to_string(),
            desc: "Dominant Seventh (属和音・属七の和音): 緊張・推進".to_string(),
        },
        6 => HarmonyInfo {
            roman: "Ⅵm7".to_string(),
            desc: "Submediant Seventh (下中和音・短七の和音): 儚さ・哀愁".to_string(),
        },
        7 => HarmonyInfo {
            roman: "Ⅶm7♭5".to_string(),
            desc: "Leading Tone Seventh (導和音・半減七の和音): 不安・未解決".to_string(),
        },
        _ => HarmonyInfo {
            roman: "".to_string(),
            desc: "".to_string(),
        },
    }
}

/// コードトーンのラベルを取得
#[wasm_bindgen]
pub fn get_chord_tone_label(scale: &str, chord: &str, target_pitch: &str) -> String {
    let interval = get_interval(chord, target_pitch);

    if interval == "1" {
        let chord_function = get_functional_harmony(scale, chord);
        match chord_function {
            1 => "Tonic Note",
            2 => "Supertonic Note",
            3 => "Mediant Note",
            4 => "Subdominant Note",
            5 => "Dominant Note",
            6 => "Submediant Note",
            7 => "Leading Tone Note",
            _ => "",
        }
        .to_string()
    } else {
        String::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_functional_harmony() {
        // CメジャースケールのC = Ⅰ
        assert_eq!(get_functional_harmony("C", "C"), 1);
        // CメジャースケールのG = Ⅴ
        assert_eq!(get_functional_harmony("C", "G"), 5);
    }

    #[test]
    fn test_functional_harmony_text() {
        assert_eq!(functional_harmony_text(1), "Ⅰ Tonic");
        assert_eq!(functional_harmony_text(5), "Ⅴ Dominant");
    }

    #[test]
    fn test_functional_harmony_info() {
        let info = functional_harmony_info(1);
        assert_eq!(info.roman, "Ⅰ");
        assert!(info.desc.contains("Tonic"));
    }
}

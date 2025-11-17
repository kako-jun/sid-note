use wasm_bindgen::prelude::*;
use std::collections::HashMap;

/// スケールの構成音を取得（scaleUtil.ts の getScaleNoteNames() に相当）
#[wasm_bindgen]
pub fn get_scale_note_names(scale: &str) -> Vec<JsValue> {
    let scale_map = create_scale_note_map();
    scale_map
        .get(scale)
        .unwrap_or(&vec![])
        .iter()
        .map(|s| JsValue::from_str(s))
        .collect()
}

/// スケールごとの構成音マップを作成
pub fn create_scale_note_map() -> HashMap<&'static str, Vec<&'static str>> {
    let mut map = HashMap::new();

    // C系
    map.insert("C", vec!["C", "D", "E", "F", "G", "A", "B"]);
    map.insert("Cm", vec!["C", "D", "E♭", "F", "G", "A♭", "B♭"]);
    map.insert("C＃", vec!["C＃", "D＃", "E＃", "F＃", "G＃", "A＃", "B＃"]);
    map.insert("C＃m", vec!["C＃", "D＃", "E", "F＃", "G＃", "A", "B"]);
    map.insert("C♭", vec!["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭"]);
    map.insert("C♭m", vec!["C♭", "D♭", "E♭♭", "F♭", "G♭", "A♭♭", "B♭♭"]);

    // D系
    map.insert("D", vec!["D", "E", "F＃", "G", "A", "B", "C＃"]);
    map.insert("Dm", vec!["D", "E", "F", "G", "A", "B♭", "C"]);
    map.insert("D＃", vec!["D＃", "E＃", "F＃＃", "G＃", "A＃", "B＃", "C＃＃"]);
    map.insert("D＃m", vec!["D＃", "E＃", "F＃", "G＃", "A＃", "B", "C＃"]);
    map.insert("D♭", vec!["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"]);
    map.insert("D♭m", vec!["D♭", "E♭", "F♭", "G♭", "A♭", "B♭♭", "C♭"]);

    // E系
    map.insert("E", vec!["E", "F＃", "G＃", "A", "B", "C＃", "D＃"]);
    map.insert("Em", vec!["E", "F＃", "G", "A", "B", "C", "D"]);
    map.insert("E＃", vec!["E＃", "F＃＃", "G＃＃", "A＃", "B＃", "C＃＃", "D＃＃"]);
    map.insert("E＃m", vec!["E＃", "F＃＃", "G＃", "A＃", "B＃", "C＃", "D＃"]);
    map.insert("E♭", vec!["E♭", "F", "G", "A♭", "B♭", "C", "D"]);
    map.insert("E♭m", vec!["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"]);

    // F系
    map.insert("F", vec!["F", "G", "A", "B♭", "C", "D", "E"]);
    map.insert("Fm", vec!["F", "G", "A♭", "B♭", "C", "D♭", "E♭"]);
    map.insert("F＃", vec!["F＃", "G＃", "A＃", "B", "C＃", "D＃", "E＃"]);
    map.insert("F＃m", vec!["F＃", "G＃", "A", "B", "C＃", "D", "E"]);
    map.insert("F♭", vec!["F♭", "G♭", "A♭", "B♭♭", "C♭", "D♭", "E♭"]);
    map.insert("F♭m", vec!["F♭", "G♭", "A♭♭", "B♭♭", "C♭", "D♭♭", "E♭♭"]);

    // G系
    map.insert("G", vec!["G", "A", "B", "C", "D", "E", "F＃"]);
    map.insert("Gm", vec!["G", "A", "B♭", "C", "D", "E♭", "F"]);
    map.insert("G＃", vec!["G＃", "A＃", "B＃", "C＃", "D＃", "E＃", "F＃＃"]);
    map.insert("G＃m", vec!["G＃", "A＃", "B", "C＃", "D＃", "E", "F＃"]);
    map.insert("G♭", vec!["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"]);
    map.insert("G♭m", vec!["G♭", "A♭", "B♭♭", "C♭", "D♭", "E♭♭", "F♭"]);

    // A系
    map.insert("A", vec!["A", "B", "C＃", "D", "E", "F＃", "G＃"]);
    map.insert("Am", vec!["A", "B", "C", "D", "E", "F", "G"]);
    map.insert("A＃", vec!["A＃", "B＃", "C＃＃", "D＃", "E＃", "F＃＃", "G＃＃"]);
    map.insert("A＃m", vec!["A＃", "B＃", "C＃", "D＃", "E＃", "F＃", "G＃"]);
    map.insert("A♭", vec!["A♭", "B♭", "C", "D♭", "E♭", "F", "G"]);
    map.insert("A♭m", vec!["A♭", "B♭", "C♭", "D♭", "E♭", "F♭", "G♭"]);

    // B系
    map.insert("B", vec!["B", "C＃", "D＃", "E", "F＃", "G＃", "A＃"]);
    map.insert("Bm", vec!["B", "C＃", "D", "E", "F＃", "G", "A"]);
    map.insert("B＃", vec!["B＃", "C＃＃", "D＃＃", "E＃", "F＃＃", "G＃＃", "A＃＃"]);
    map.insert("B＃m", vec!["B＃", "C＃＃", "D＃", "E＃", "F＃＃", "G＃", "A＃"]);
    map.insert("B♭", vec!["B♭", "C", "D", "E♭", "F", "G", "A"]);
    map.insert("B♭m", vec!["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"]);

    map
}

/// ダイアトニックコード（トライアド）を取得
#[wasm_bindgen]
pub fn get_scale_diatonic_chords(scale: &str) -> Vec<JsValue> {
    let chord_map = create_diatonic_chord_map();
    chord_map
        .get(scale)
        .unwrap_or(&vec![])
        .iter()
        .map(|s| JsValue::from_str(s))
        .collect()
}

/// ダイアトニックコードマップを作成
pub fn create_diatonic_chord_map() -> HashMap<&'static str, Vec<&'static str>> {
    let mut map = HashMap::new();

    // C系
    map.insert("C", vec!["C", "Dm", "Em", "F", "G", "Am", "Bdim"]);
    map.insert("Cm", vec!["Cm", "Ddim", "E♭", "Fm", "Gm", "A♭", "B♭"]);
    map.insert("C＃", vec!["C＃", "D＃m", "Fm", "F＃", "G＃", "A＃m", "Cdim"]);
    map.insert("C＃m", vec!["C＃m", "D＃dim", "E", "F＃m", "G＃m", "A", "B"]);
    map.insert("C♭", vec!["C♭", "D♭m", "E♭m", "F♭", "G♭", "A♭m", "B♭dim"]);
    map.insert("C♭m", vec!["C♭m", "D♭dim", "E♭♭", "F♭m", "G♭m", "A♭♭", "B♭♭"]);

    // D系
    map.insert("D", vec!["D", "Em", "F＃m", "G", "A", "Bm", "C＃dim"]);
    map.insert("Dm", vec!["Dm", "Edim", "F", "Gm", "Am", "B♭", "C"]);
    map.insert("D＃", vec!["D＃", "Fm", "Gm", "G＃", "A＃", "Cm", "Ddim"]);
    map.insert("D＃m", vec!["D＃m", "Fdim", "F＃", "G＃m", "A＃m", "B", "C＃"]);
    map.insert("D♭", vec!["D♭", "E♭m", "Fm", "G♭", "A♭", "B♭m", "Cdim"]);
    map.insert("D♭m", vec!["D♭m", "E♭dim", "F♭", "G♭m", "A♭m", "B♭♭", "C♭"]);

    // E系
    map.insert("E", vec!["E", "F＃m", "G＃m", "A", "B", "C＃m", "D＃dim"]);
    map.insert("Em", vec!["Em", "F＃dim", "G", "Am", "Bm", "C", "D"]);
    map.insert("E＃", vec!["E＃", "F＃＃m", "G＃＃m", "A＃", "B＃", "C＃＃m", "D＃＃dim"]);
    map.insert("E＃m", vec!["E＃m", "F＃＃dim", "G＃", "A＃m", "B＃m", "C＃", "D＃"]);
    map.insert("E♭", vec!["E♭", "Fm", "Gm", "A♭", "B♭", "Cm", "Ddim"]);
    map.insert("E♭m", vec!["E♭m", "Fdim", "G♭", "A♭m", "B♭m", "C♭", "D♭"]);

    // F系
    map.insert("F", vec!["F", "Gm", "Am", "B♭", "C", "Dm", "Edim"]);
    map.insert("Fm", vec!["Fm", "Gdim", "A♭", "B♭m", "Cm", "D♭", "E♭"]);
    map.insert("F＃", vec!["F＃", "G＃m", "A＃m", "B", "C＃", "D＃m", "E＃dim"]);
    map.insert("F＃m", vec!["F＃m", "G＃dim", "A", "Bm", "C＃m", "D", "E"]);
    map.insert("F♭", vec!["F♭", "G♭m", "A♭m", "B♭♭", "C♭", "D♭m", "E♭dim"]);
    map.insert("F♭m", vec!["F♭m", "G♭dim", "A♭♭", "B♭♭m", "C♭m", "D♭♭", "E♭♭"]);

    // G系
    map.insert("G", vec!["G", "Am", "Bm", "C", "D", "Em", "F＃dim"]);
    map.insert("Gm", vec!["Gm", "Adim", "B♭", "Cm", "Dm", "E♭", "F"]);
    map.insert("G＃", vec!["G＃", "A＃m", "Cm", "C＃", "D＃", "Fm", "Gdim"]);
    map.insert("G＃m", vec!["G＃m", "A＃dim", "B", "C＃m", "D＃m", "E", "F＃"]);
    map.insert("G♭", vec!["G♭", "A♭m", "B♭m", "C♭", "D♭", "E♭m", "Fdim"]);
    map.insert("G♭m", vec!["G♭m", "A♭dim", "B♭♭", "C♭m", "D♭m", "E♭♭", "F♭"]);

    // A系
    map.insert("A", vec!["A", "Bm", "C＃m", "D", "E", "F＃m", "G＃dim"]);
    map.insert("Am", vec!["Am", "Bdim", "C", "Dm", "Em", "F", "G"]);
    map.insert("A＃", vec!["A＃", "Cm", "Dm", "D＃", "F", "Gm", "Adim"]);
    map.insert("A＃m", vec!["A＃m", "Cdim", "C＃", "D＃m", "Fm", "F＃", "G＃"]);
    map.insert("A♭", vec!["A♭", "B♭m", "Cm", "D♭", "E♭", "Fm", "Gdim"]);
    map.insert("A♭m", vec!["A♭m", "B♭dim", "C♭", "D♭m", "E♭m", "F♭", "G♭"]);

    // B系
    map.insert("B", vec!["B", "C＃m", "D＃m", "E", "F＃", "G＃m", "A＃dim"]);
    map.insert("Bm", vec!["Bm", "C＃dim", "D", "Em", "F＃m", "G", "A"]);
    map.insert("B＃", vec!["B＃", "C＃＃m", "D＃＃m", "E＃", "F＃＃", "G＃＃m", "A＃＃dim"]);
    map.insert("B＃m", vec!["B＃m", "C＃＃dim", "D＃", "E＃m", "F＃＃m", "G＃", "A＃"]);
    map.insert("B♭", vec!["B♭", "Cm", "Dm", "E♭", "F", "Gm", "Adim"]);
    map.insert("B♭m", vec!["B♭m", "Cdim", "D♭", "E♭m", "Fm", "G♭", "A♭"]);

    map
}

/// ダイアトニックコード（7th）を取得
#[wasm_bindgen]
pub fn get_scale_diatonic_chords_with_7th(scale: &str) -> Vec<JsValue> {
    let chord_map = create_diatonic_chord_7th_map();
    chord_map
        .get(scale)
        .unwrap_or(&vec![])
        .iter()
        .map(|s| JsValue::from_str(s))
        .collect()
}

/// ダイアトニックコード（7th）マップを作成
pub fn create_diatonic_chord_7th_map() -> HashMap<&'static str, Vec<&'static str>> {
    let mut map = HashMap::new();

    // C系
    map.insert("C", vec!["Cmaj7", "Dm7", "Em7", "Fmaj7", "G7", "Am7", "Bm7♭5"]);
    map.insert("Cm", vec!["Cm(maj7)", "Dm7♭5", "E♭maj7", "Fm7", "Gm7", "A♭maj7", "B♭7"]);
    map.insert("C＃", vec!["C＃maj7", "D＃m7", "Fm7", "F＃maj7", "G＃7", "A＃m7", "C7"]);
    map.insert("C＃m", vec!["C＃m(maj7)", "D＃m7♭5", "Emaj7", "F＃m7", "G＃m7", "Amaj7", "B7"]);
    map.insert("C♭", vec!["C♭maj7", "D♭m7", "E♭m7", "F♭maj7", "G♭7", "A♭m7", "B♭m7♭5"]);
    map.insert("C♭m", vec!["C♭m(maj7)", "D♭m7♭5", "E♭♭maj7", "F♭m7", "G♭m7", "A♭♭maj7", "B♭♭7"]);

    // D系
    map.insert("D", vec!["Dmaj7", "Em7", "F＃m7", "Gmaj7", "A7", "Bm7", "C＃m7♭5"]);
    map.insert("Dm", vec!["Dm(maj7)", "Em7♭5", "Fmaj7", "Gm7", "Am7", "B♭maj7", "C7"]);
    map.insert("D＃", vec!["D＃maj7", "Fm7", "Gm7", "G＃maj7", "A＃7", "Cm7", "D7"]);
    map.insert("D＃m", vec!["D＃m(maj7)", "Fm7♭5", "F＃maj7", "G＃m7", "A＃m7", "Bmaj7", "C＃7"]);
    map.insert("D♭", vec!["D♭maj7", "E♭m7", "Fm7", "G♭maj7", "A♭7", "B♭m7", "C7"]);
    map.insert("D♭m", vec!["D♭m(maj7)", "E♭m7♭5", "F♭maj7", "G♭m7", "A♭m7", "B♭♭maj7", "C♭7"]);

    // E系
    map.insert("E", vec!["Emaj7", "F＃m7", "G＃m7", "Amaj7", "B7", "C＃m7", "D＃m7♭5"]);
    map.insert("Em", vec!["Em(maj7)", "F＃m7♭5", "Gmaj7", "Am7", "Bm7", "Cmaj7", "D7"]);
    map.insert("E＃", vec!["E＃maj7", "F＃＃m7", "G＃＃m7", "A＃maj7", "B＃7", "C＃＃m7", "D＃＃m7♭5"]);
    map.insert("E＃m", vec!["E＃m(maj7)", "F＃＃m7♭5", "G＃maj7", "A＃m7", "B＃m7", "C＃maj7", "D＃7"]);
    map.insert("E♭", vec!["E♭maj7", "Fm7", "Gm7", "A♭maj7", "B♭7", "Cm7", "Dm7♭5"]);
    map.insert("E♭m", vec!["E♭m(maj7)", "Fm7♭5", "G♭maj7", "A♭m7", "B♭m7", "C♭maj7", "D♭7"]);

    // F系
    map.insert("F", vec!["Fmaj7", "Gm7", "Am7", "B♭maj7", "C7", "Dm7", "Em7♭5"]);
    map.insert("Fm", vec!["Fm(maj7)", "Gm7♭5", "A♭maj7", "B♭m7", "Cm7", "D♭maj7", "E♭7"]);
    map.insert("F＃", vec!["F＃maj7", "G＃m7", "A＃m7", "Bmaj7", "C＃7", "D＃m7", "E＃m7♭5"]);
    map.insert("F＃m", vec!["F＃m(maj7)", "G＃m7♭5", "Amaj7", "Bm7", "C＃m7", "Dmaj7", "E7"]);
    map.insert("F♭", vec!["F♭maj7", "G♭m7", "A♭m7", "B♭♭maj7", "C♭7", "D♭m7", "E♭m7♭5"]);
    map.insert("F♭m", vec!["F♭m(maj7)", "G♭m7♭5", "A♭♭maj7", "B♭♭m7", "C♭m7", "D♭♭maj7", "E♭♭7"]);

    // G系
    map.insert("G", vec!["Gmaj7", "Am7", "Bm7", "Cmaj7", "D7", "Em7", "F＃m7♭5"]);
    map.insert("Gm", vec!["Gm(maj7)", "Am7♭5", "B♭maj7", "Cm7", "Dm7", "E♭maj7", "F7"]);
    map.insert("G＃", vec!["G＃maj7", "A＃m7", "Cm7", "C＃maj7", "D＃7", "Fm7", "Gm7♭5"]);
    map.insert("G＃m", vec!["G＃m(maj7)", "A＃m7♭5", "Bmaj7", "C＃m7", "D＃m7", "Emaj7", "F＃7"]);
    map.insert("G♭", vec!["G♭maj7", "A♭m7", "B♭m7", "C♭maj7", "D♭7", "E♭m7", "Fm7♭5"]);
    map.insert("G♭m", vec!["G♭m(maj7)", "A♭m7♭5", "B♭♭maj7", "C♭m7", "D♭m7", "E♭♭maj7", "F♭7"]);

    // A系
    map.insert("A", vec!["Amaj7", "Bm7", "C＃m7", "Dmaj7", "E7", "F＃m7", "G＃m7♭5"]);
    map.insert("Am", vec!["Am(maj7)", "Bm7♭5", "Cmaj7", "Dm7", "Em7", "Fmaj7", "G7"]);
    map.insert("A＃", vec!["A＃maj7", "Cm7", "Dm7", "D＃maj7", "F7", "Gm7", "Am7♭5"]);
    map.insert("A＃m", vec!["A＃m(maj7)", "Cm7♭5", "C＃maj7", "D＃m7", "Fm7", "F＃maj7", "G＃7"]);
    map.insert("A♭", vec!["A♭maj7", "B♭m7", "Cm7", "D♭maj7", "E♭7", "Fm7", "Gm7♭5"]);
    map.insert("A♭m", vec!["A♭m(maj7)", "B♭m7♭5", "C♭maj7", "D♭m7", "E♭m7", "F♭maj7", "G♭7"]);

    // B系
    map.insert("B", vec!["Bmaj7", "C＃m7", "D＃m7", "Emaj7", "F＃7", "G＃m7", "A＃m7♭5"]);
    map.insert("Bm", vec!["Bm(maj7)", "C＃m7♭5", "Dmaj7", "Em7", "F＃m7", "Gmaj7", "A7"]);
    map.insert("B＃", vec!["B＃maj7", "C＃＃m7", "D＃＃m7", "E＃maj7", "F＃＃7", "G＃＃m7", "A＃＃m7♭5"]);
    map.insert("B＃m", vec!["B＃m(maj7)", "C＃＃m7♭5", "D＃maj7", "E＃m7", "F＃＃m7", "G＃maj7", "A＃7"]);
    map.insert("B♭", vec!["B♭maj7", "Cm7", "Dm7", "E♭maj7", "F7", "Gm7", "Am7♭5"]);
    map.insert("B♭m", vec!["B♭m(maj7)", "Cm7♭5", "D♭maj7", "E♭m7", "Fm7", "G♭maj7", "A♭7"]);

    map
}

/// スケール名の英語表記を取得
#[wasm_bindgen]
pub fn scale_text(scale: &str) -> String {
    let scale_names: HashMap<&str, &str> = [
        ("C", "C Major"),
        ("Cm", "C Minor"),
        ("C＃", "C＃ Major"),
        ("C＃m", "C＃ Minor"),
        ("C♭", "C♭ Major"),
        ("C♭m", "C♭ Minor"),
        ("D", "D Major"),
        ("Dm", "D Minor"),
        ("D＃", "D＃ Major"),
        ("D＃m", "D＃ Minor"),
        ("D♭", "D♭ Major"),
        ("D♭m", "D♭ Minor"),
        ("E", "E Major"),
        ("Em", "E Minor"),
        ("E＃", "E＃ Major"),
        ("E＃m", "E＃ Minor"),
        ("E♭", "E♭ Major"),
        ("E♭m", "E♭ Minor"),
        ("F", "F Major"),
        ("Fm", "F Minor"),
        ("F＃", "F＃ Major"),
        ("F＃m", "F＃ Minor"),
        ("F♭", "F♭ Major"),
        ("F♭m", "F♭ Minor"),
        ("G", "G Major"),
        ("Gm", "G Minor"),
        ("G＃", "G＃ Major"),
        ("G＃m", "G＃ Minor"),
        ("G♭", "G♭ Major"),
        ("G♭m", "G♭ Minor"),
        ("A", "A Major"),
        ("Am", "A Minor"),
        ("A＃", "A＃ Major"),
        ("A＃m", "A＃ Minor"),
        ("A♭", "A♭ Major"),
        ("A♭m", "A♭ Minor"),
        ("B", "B Major"),
        ("Bm", "B Minor"),
        ("B＃", "B＃ Major"),
        ("B＃m", "B＃ Minor"),
        ("B♭", "B♭ Major"),
        ("B♭m", "B♭ Minor"),
    ]
    .iter()
    .cloned()
    .collect();

    scale_names
        .get(scale)
        .map(|s| format!("{} Scale", s))
        .unwrap_or_else(|| scale.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_scale_note_names() {
        let scale_map = create_scale_note_map();
        let c_major = scale_map.get("C").unwrap();
        assert_eq!(c_major.len(), 7);
        assert_eq!(c_major[0], "C");
        assert_eq!(c_major[6], "B");
    }

    #[test]
    fn test_get_scale_diatonic_chords() {
        let chord_map = create_diatonic_chord_map();
        let c_major = chord_map.get("C").unwrap();
        assert_eq!(c_major.len(), 7);
        assert_eq!(c_major[0], "C");
        assert_eq!(c_major[4], "G");
    }

    #[test]
    fn test_scale_text() {
        assert_eq!(scale_text("C"), "C Major Scale");
        assert_eq!(scale_text("Am"), "A Minor Scale");
    }
}

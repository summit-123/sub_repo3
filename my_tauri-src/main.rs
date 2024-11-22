use tauri::{Manager, window::Window};

#[tauri::command]
fn load_url(url: String) {
    println!("Loading URL: {}", url);
}

#[tauri::command]
fn set_window_bounds(window: Window, x: i32, y: i32, width: i32, height: i32) {
    println!("Setting window bounds to x: {}, y: {}, width: {}, height: {}", x, y, width, height);
    if let Err(e) = window.set_size(tauri::Size::Logical(tauri::LogicalSize { width: width as f64, height: height as f64 })) {
        eprintln!("Error setting size: {:?}", e);
    }
    if let Err(e) = window.set_position(tauri::Position::Logical(tauri::LogicalPosition { x: x as f64, y: y as f64 })) {
        eprintln!("Error setting position: {:?}", e);
    }
}

#[tauri::command]
fn quit() {
    std::process::exit(0);
}

#[tauri::command]
fn read_file(path: String) -> String {
    std::fs::read_to_string(path).unwrap_or_else(|_| "Error reading file".to_string())
}

#[tauri::command]
fn write_file(path: String, data: String) {
    std::fs::write(path, data).unwrap_or_else(|_| eprintln!("Error writing to file"));
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            load_url,
            set_window_bounds,
            quit,
            read_file,
            write_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

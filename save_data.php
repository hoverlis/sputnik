php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Путь для сохранения изображений
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Сохраняем изображение
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        $title = $_POST['title'];
        $description = $_POST['description'];
        $image_path = $target_file;

        // Сохраняем данные в JSON
        $data = [
            "title" => $title,
            "description" => $description,
            "image" => $image_path
        ];
        file_put_contents('data.json', json_encode($data));

        // Перенаправляем на snimki.html
        header('Location: snimki.html');
        exit;
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
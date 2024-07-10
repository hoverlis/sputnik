javascript
    document.getElementById('dataForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const imageInput = document.getElementById('image').files[0];

        if (imageInput) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const image = e.target.result;
                const newData = {
                    title: title,
                    description: description,
                    image: image
                };

                addDataToPage(newData);
                saveDataToLocalStorage(newData);
            };
            reader.readAsDataURL(imageInput);
        }
    });

    function addDataToPage(data) {
        const container = document.getElementById('dataContainer');
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <td class="image-cell">
                    <img src="${data.image}" alt="Спутниковый снимок">
                </td>
                <td class="text-cell">
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                </td>
            </tr>
        `;
        container.appendChild(table);
    }

    function saveDataToLocalStorage(data) {
        const existingData = JSON.parse(localStorage.getItem('dataList')) || [];
        existingData.push(data);
        localStorage.setItem('dataList', JSON.stringify(existingData));
    }

    function loadDataFromLocalStorage() {
        const existingData = JSON.parse(localStorage.getItem('dataList')) || [];
        existingData.forEach(data => addDataToPage(data));
    }

    function generateNewHtmlFile() {
        const existingData = JSON.parse(localStorage.getItem('dataList')) || [];
        let newPageContent = `
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Собранные данные</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <div class="topnav">
                    <a href="#">Главная</a>
                    <a href="snimki.html">Каталог снимков</a>
                    <a href="команда.html">Команда</a>
                </div>
                <div class="header">
                    <h1>Собранные данные</h1>
                </div>
                <div id="dataContainer">
        `;

        existingData.forEach(data => {
            newPageContent += `
                <table>
                    <tr>
                        <td class="image-cell">
                            <img src="${data.image}" alt="Спутниковый снимок">
                        </td>
                        <td class="text-cell">
                            <h2>${data.title}</h2>
                            <p>${data.description}</p>
                        </td>
                    </tr>
                </table>
            `;
        });

        newPageContent += `
                </div>
            </body>
            </html>
        `;

        // Создание ссылки на скачивание нового HTML файла
        const blob = new Blob([newPageContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'collected_data.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // При загрузке страницы загружаем данные из Local Storage
    window.onload = function() {
        loadDataFromLocalStorage();
    };

    document.getElementById('downloadBtn').addEventListener('click', generateNewHtmlFile);
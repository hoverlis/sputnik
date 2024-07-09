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

            let dataArray = JSON.parse(localStorage.getItem('satelliteData')) || [];
            dataArray.push(newData);
            localStorage.setItem('satelliteData', JSON.stringify(dataArray));

            alert('Данные сохранены!');
            renderData(dataArray);
        }
        reader.readAsDataURL(imageInput);
    }
});

function renderData(dataArray) {
    const container = document.getElementById('dataContainer');
    container.innerHTML = '';
    dataArray.forEach(data => {
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
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let dataArray = JSON.parse(localStorage.getItem('satelliteData')) || [];
    renderData(dataArray);
});
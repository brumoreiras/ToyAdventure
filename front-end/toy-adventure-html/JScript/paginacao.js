document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('my-table');
    const rowsPerPage = 6; 
    const totalRows = table.rows.length - 1; 
    let currentPage = 1;

    function showRows(page) {
        const start = (page - 1) * rowsPerPage + 1;
        const end = page * rowsPerPage + 1;

        for (let i = 1; i < table.rows.length; i++) {
            if (i >= start && i < end) {
                table.rows[i].style.display = '';
            } else {
                table.rows[i].style.display = 'none';
            }
        }

        document.getElementById('page-num').textContent = `Página ${page} de ${Math.ceil(totalRows / rowsPerPage)}`;
    }

    document.getElementById('prev-btn').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            showRows(currentPage);
        }
    });

    document.getElementById('next-btn').addEventListener('click', function () {
        if (currentPage < Math.ceil(totalRows / rowsPerPage)) {
            currentPage++;
            showRows(currentPage);
        }
    });

    showRows(currentPage);
});

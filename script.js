let count = 0;

function downloadISO() {
    count++;
    document.getElementById('count').innerText = count;
    // Redirect to your ISO file URL
    window.location.href = 'path/to/your/iso-file.iso';
}


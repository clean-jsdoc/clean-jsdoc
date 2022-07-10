function numberSourceLines() {
    const source = document.getElementsByClassName('prettyprint source linenums');
    let i = 0;
    let lineNumber = 0;
    let lineId = 0;
    let lines = [];
    let totalLines = 0;
    let anchorHash = '#';

    if (source && source[0]) {
        anchorHash = document.location.hash.substring(1);
        lines = source[0].getElementsByTagName('li');
        totalLines = lines.length;

        for (; i < totalLines; i++) {
            lineNumber++;
            lineId = `line${lineNumber}`;
            lines[i].id = lineId;
            if (lineId === anchorHash) {
                lines[i].className += ' selected';
            }
        }
    }
}

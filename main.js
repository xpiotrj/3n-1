google.charts.load('current',{packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);

function isEven(number){
    if(number % 2 == 0){
        return true;
    }
    else{
        return false;
    }
}


function calculate(base_number){
    let operation_log = [];
    let graph_data = [['', 'Number']];
    let counter = 0;
    if(base_number <= 1){
      return;
    }
    operation_log.push([base_number, ''])
    graph_data.push([counter, parseInt(base_number)]) 
    let next_number = base_number;
    while(next_number != 1){
        counter++;
        if(isEven(next_number)){
            operation_log.push([ next_number / 2,`${next_number} / 2 = ${next_number / 2}`])
            next_number = next_number / 2;       
        }
        else{
            operation_log.push([(3 * next_number) + 1, `${next_number} * 3 + 1 = ${(next_number * 3) + 1}`])
            next_number = (3 * next_number) + 1;
        }
        graph_data.push([counter, next_number])
    }
    return {graph_data: graph_data, log: operation_log};
}

function writeHistory(data){
    let div = document.getElementById('moreinfo-div');

    div.innerHTML = '';

    for(let i = 0; i< data.length; i++){
        div.innerHTML += data[i][1] + '<br>'
    }
}

function controller(base_number){
    /// vvvv graph_data, log vvvvv ///
    let data = calculate(base_number);
    drawChart(data['graph_data'])
    writeHistory(data['log'])
}

function drawChart(data){
    const graph_data = google.visualization.arrayToDataTable(data);

    const options = {
        title: '3n+1',
        hAxis: {title: ''},
        vAxis: {title: 'Number'},
        legend: 'none'
      };

    const chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(graph_data, options);
}


window.onload = () => {
    document.getElementById('calculate-btn').addEventListener('click', () => {
        let number = document.getElementById('number-input').value;
        controller(number);
    })
}
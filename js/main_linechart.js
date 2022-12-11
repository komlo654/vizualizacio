let total_net_incomes_by_year = [];
d3.csv("data/incomes.csv").then(data =>  {
    let x = 0
    data.forEach(element => {
        if (element.Denomination === "Net income total" && element.year > 2010) {
            let object = {};
            object.x = x
            object.year = +element.year
            object.total = +element.Total.replaceAll(" ", "")
            total_net_incomes_by_year.push(object)
            x = x + 200
        }
    });

    console.log(total_net_incomes_by_year)

    const line = d3.line()
        .x(d => d.x)
        .y(d => 200 - (Math.round(d.total / 100000) * 10));

    // Add the <path> to the <svg> container using the helper function
    d3.select('svg').append('path')
        .attr('d', line(total_net_incomes_by_year))
        .attr('stroke', 'red')
        .attr('fill', 'none');
})
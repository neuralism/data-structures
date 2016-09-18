var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/week2/data/m01.txt');

var $ = cheerio.load(content);
var data = [];
var address = [];

// $('div table tbody tr') selects the <tr> based on this hierarchy
// .each() loops through each of the <tr>s
$('div table tbody tr').each(function(i, elem) {
    // looks for the first <td> (there are 3 <td>s within <tr>) and pushes its content into an array.
    data.push($(elem).find('td').first().text());
});

// loop to extract the addresses and store them into an array
for (var i = 0; i < data.length; i++) {
    address.push(data[i]
        // splits everything separated by a line break ('\n') into an array of substrings and selects item [3] where the address is placed 
        .split('\n')[3]
        // splits everything separated by a ',' into an array of substrings and selects item [0] which is the address
        .split(',')[0]
        // splits everything separated by a '- ' into an array of substrings (added a space because some addresses go like 206-208 East 11th Street)
        .split('- ')[0]
        // splits everything separated by a '(' into an array of substrings as ome addresses have additional info wraped in parentheses '()' 
        .split('(')[0]
        // removes all whitespace
        .trim());
}

// show all addresses in console
for (var i = 0; i < address.length; i++) {
    console.log(address[i]);
}

/* 
Output:
20 Cardinal Hayes Place
20 Cardinal Hayes Place
29 Mott Street
49 Fulton Street
44 John Street
49 Fulton Street
20 Cardinal Hayes Place
22 Barclay Street
20 Cardinal Hayes Place
22 Barclay Street
283 West Broadway
125 Barclay Street
49 Fulton Street
49 Fulton Street
20 Cardinal Hayes Place
283 West Broadway
49 Fulton Street
22 Barclay Street
20 Cardinal Hayes Place
283 West Broadway
283 West Broadway
283 W. Broadway
*/
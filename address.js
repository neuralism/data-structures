var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/data/m01.txt');

var $ = cheerio.load(content);
var data = [];
var address = [];

// $('div table tbody tr') selects the <tr> based on this hierarchy
// .each() loops through each of the <tr>s
$('div table tbody tr').each(function(i, elem) {
    // looks for the first <td> (there are 3 <td>s within <tr>) and pushes its content into an array.
    data.push($(elem).find('td').first().text());
});

// loop to extract the address and store them into the address array
for (var i = 0; i < data.length; i++) {
    address.push(data[i]
        // stores substrings separated by a line break '\n' into an array and selects array item [3] which contains the address and some additional info
        .split('\n')[3]
        // stores all substrings separated by a ',' into an array and selects array item [0] which is the address itself
        .split(',')[0]
        // stores all substrings seperated by a '- ' into an array. Some addresses have additional info that come after a '- ' (added a space because some addresses go like 206-208 East 11th Street)
        .split('- ')[0]
        // stores all substrings seperated by a '(' into an array. Some addresses have additional info wraped in parentheses '()' 
        .split('(')[0]
        // removes all whitespace
        .trim());
}

// show all addresses in console
for (var i = 0; i < address.length; i++) {
    console.log(address[i]);
}
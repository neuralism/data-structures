### Sensor Output in Node:
```bash
Joshuas-MacBook-Pro:assignment Neuralism$ node sensor.js
1478522862748 Device(s) /dev/cu.usbmodemFD121  
1478522862760 Connected /dev/cu.usbmodemFD121  
1478522866545 Repl Initialized  
>> Button was pressed at Mon Nov 07 2016 07:10:46 GMT-0500 (EST)
Button was pressed at Mon Nov 07 2016 07:10:49 GMT-0500 (EST)
Button was pressed at Mon Nov 07 2016 07:10:50 GMT-0500 (EST)
Button was pressed at Mon Nov 07 2016 07:10:54 GMT-0500 (EST)
Button was pressed at Mon Nov 07 2016 07:10:58 GMT-0500 (EST)
Button was pressed at Mon Nov 07 2016 07:10:59 GMT-0500 (EST)
Button was pressed at Mon Nov 07 2016 07:11:00 GMT-0500 (EST)
Button was pressed at Mon Nov 07 2016 07:11:00 GMT-0500 (EST)
Button was pressed at Mon Nov 07 2016 07:11:01 GMT-0500 (EST)
```
### Create Table Result
```bash
Result {
  command: 'CREATE',
  rowCount: NaN,
  oid: null,
  rows: [],
  fields: [],
  _parsers: [],
  RowCtor: null,
  rowAsArray: false,
  _getTypeParser: [Function: bound ] }
  
### Insert Result
```bash  
Result {
  command: 'INSERT',
  rowCount: 1,
  oid: 0,
  rows: [],
  fields: [],
  _parsers: [],
  RowCtor: null,
  rowAsArray: false,
  _getTypeParser: [Function: bound ] }
```

### Query Result
```bash
Result {
  command: 'SELECT',
  rowCount: 1,
  oid: NaN,
  rows: [ anonymous { door_id: 0, status: false, datetime: null } ],
  fields: 
   [ Field {
       name: 'door_id',
       tableID: 16396,
       columnID: 1,
       dataTypeID: 21,
       dataTypeSize: 2,
       dataTypeModifier: -1,
       format: 'text' },
     Field {
       name: 'status',
       tableID: 16396,
       columnID: 2,
       dataTypeID: 16,
       dataTypeSize: 1,
       dataTypeModifier: -1,
       format: 'text' },
     Field {
       name: 'datetime',
       tableID: 16396,
       columnID: 3,
       dataTypeID: 1114,
       dataTypeSize: 8,
       dataTypeModifier: -1,
       format: 'text' } ],
  _parsers: 
   [ [Function: parseInteger],
     [Function: parseBool],
     [Function: parseDate] ],
  RowCtor: [Function: anonymous],
  rowAsArray: false,
  _getTypeParser: [Function: bound ] }
```
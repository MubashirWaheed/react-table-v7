# Project Overview

I have made the required changes

- Project is missing node_module folder. In oder to get it run this commonad in terminal `npm install`
  this will install the project dependencies

- After that run `npm start` this will start server on localhost the test data I created and present in `JewerlyOrders` folder

- Data for few coloumns are missing in mock data and they are commented in the `Columns.js`.

- Go thorugh the jewelry files and remove test data code. I haven't removed the code because I want you to see the workin table I

## Done

- Columns are resize able

- Width of each column can be changed according to needs by changing the width value in `column.js`

- I used `useBlocklayout` hook for for changing width

- Table tags need to be changed to the div otherwise width property doesn't work. Here is an example form offical docs: https://codesandbox.io/s/cranky-kapitsa-4q49jr

- I added a div with `resize` class so that columns can be resized (look at the code and change color alue of `resizing` class in css)

- I have added the TextField for the description field. You can hook it the backend according to your need

- Check form is workin in the `paymentMethodTable.js` and you can change the values

NOTE: I HAVEN"T REMOVED TEST DATA CODE SO THAT BY RUNNING JUST THE `npm start` SCRIPT YOU CAN SEE THE CAHNGES

If you need help with anything let me know. I am writing thsi because you said you want code to be delivered 12:00 pm you local time and you haven't responded

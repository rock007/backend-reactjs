### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`


### `npm run build`

serve -s build


  {
            title: " 选择",
            dataIndex: "manId",
            key: "manId",
            width: 45,
            render(text, record, index) {

              return (
                  <input type="radio" name="selected" value={record.manId}/>
              )
            }
        },


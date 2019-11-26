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


declare const FormLayouts: ["horizontal", "inline", "vertical"];
export declare type FormLayout = (typeof FormLayouts)[number];
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    layout?: FormLayout;
    form?: WrappedFormUtils;
    onSubmit?: React.FormEventHandler<any>;
    style?: React.CSSProperties;
    className?: string;
    prefixCls?: string;
    hideRequiredMark?: boolean;
    /**
     * @since 3.14.0
     */
    wrapperCol?: ColProps;
    labelCol?: ColProps;
    /**
     * @since 3.15.0
     */
    colon?: boolean;
    labelAlign?: FormLabelAlign;
}


 // "@types/jest": "24.0.18",
    // "@types/moment": "^2.13.0",
   // "@types/moment-timezone": "^0.5.12",
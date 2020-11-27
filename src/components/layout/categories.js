import React from "react"
import ReuseTable from "../custom/table"

class Categories extends React.Component {

    render() {
        const data = [
            {
                name: 'test',

            },
            {
                name: 'test',

            },
            {
                name: 'test',

            },
            {
                name: 'test@.fr',

            }, {
                name: '@test.fr',

            }
        ]
        const tableHead = ['name']

        return (
            <ReuseTable tableHead={tableHead} rows={data}/>
        )
    }
}

export default Categories

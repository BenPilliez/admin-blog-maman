import React from "react"
import ReuseTable from "../custom/table"

class Categories extends React.Component {

    render() {

        return (
            <ReuseTable options={
                {
                    headCell: [
                        {
                            label: 'Nom Categorie',
                            data: (row) => row.name
                        }
                    ],
                    params: {
                        query: {
                            perPage: 10,
                            page: 0
                        },
                        url: 'category'
                    }
                }}/>
        )
    }
}

export default Categories

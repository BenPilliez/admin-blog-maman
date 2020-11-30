import React from "react"
import ReuseTable from "../custom/table"
import {useMediaQuery} from "@material-ui/core"
import moment from "moment"
import "moment/locale/fr"
import ReuseList from "../custom/list";


const Categories = () => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), { noSsr: true })

    return (
        <div>
            {!matches ? <ReuseTable options={
                {
                    headCell: [
                        {
                            label: 'Nom Categorie',
                            data: (row) => row.name
                        },
                        {
                            label: "Créer le ",
                            data: (row) => moment(row.createdAt).format('LL')
                        }
                    ],
                    params: {
                        query: {
                            perPage: 10,
                            page: 0
                        },
                        url: 'category'
                    }
                }}/> : <ReuseList options={
                {
                    text: {
                        data: (row) => row.name
                    },
                    secondaryText: [{label: "crée le ", data: (row) => moment(row.createdAt).format('LL')}],
                    params: {

                        query: {
                            perPage: 10,
                            page: 0
                        },
                        url: 'category'
                    }
                }}/>}
        </div>

    )
}

export default Categories

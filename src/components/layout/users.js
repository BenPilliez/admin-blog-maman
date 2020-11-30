import React from "react"
import ReuseTable from "../custom/table"
import ReuseList from "../custom/list"
import moment from "moment"
import {useMediaQuery} from "@material-ui/core"
import "moment/locale/fr"


const Users =  () => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), {noSsr: true})

    return (
        <div>
            {!matches ? <ReuseTable options={
                {
                    headCell: [
                        {
                            label: "id",
                        },
                        {
                            label: 'Photo',
                            data: (row) => row.avatar
                        },
                        {
                            label: "Roles",
                            data: (row) => row && row.ROLES ? row.ROLES.join(',') : null
                        },
                        {
                            label: 'email'
                        },
                        {
                            label: "Membre depuis",
                            data: (row) => moment(row.createdAt).format('LL')
                        }
                    ],
                    params: {
                        query:
                            {perPage: 10, page: 0},
                        url: 'users'
                    }
                }}
            /> : <ReuseList
                options={{
                    text: {data: (row) => row.email},
                    secondaryText: [
                        {
                            label: "roles: ",
                            data: (row) => row && row.ROLES ? row.ROLES.join(',') : null
                        },
                        {
                            label: "membre depuis le: ",
                            data: (row) => moment(row.createdAt).format('LL')
                        }
                    ],
                    params: {
                        query: {perPage: 10, page: 0},
                        url: 'users'
                    }
                }
                }/>}
        </div>
    )
}

export default Users

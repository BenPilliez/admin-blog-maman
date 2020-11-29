import React from "react"
import ReuseTable from "../custom/table"
import moment from "moment"
import "moment/locale/fr"

class Users extends React.Component {

    render() {

        return (
            <ReuseTable options={
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
            />
        )
    }
}

export default Users

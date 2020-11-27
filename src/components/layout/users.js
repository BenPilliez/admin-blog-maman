import React from "react"
import ReuseTable from "../custom/table"

class Users extends React.Component {

    render() {
        const data = [
            {
                email: 'test@test.fr',
                roles: 'role',
                id: 'test',
                avatar: 'test'
            },
            {
                email: 'test@test.fr',
                roles: 'role',
                id: 'test',
                avatar: 'test'
            },
            {
                email: 'test@test.fr',
                roles: 'role',
                id: 'test',
                avatar: 'test'
            },
            {
                email: 'test@test.fr',
                roles: 'role',
                id: 'test',
                avatar: 'test'
            }, {
                email: 'test@test.fr',
                roles: 'role',
                id: 'test',
                avatar: 'test'
            }
        ]
        const tableHead = ['email', 'ROLES', 'avatar', 'id']


        return (
            <ReuseTable tableHead={tableHead} rows={data}/>
        )
    }
}

export default Users

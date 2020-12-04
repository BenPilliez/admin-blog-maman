import React, {useEffect} from "react"
import ReuseCardList from "../../custom/card/cardList"

const Posts = (props) => {

    useEffect(() => {
        console.log("bonjour")
    })

    return (
        <div>
            <ReuseCardList
                options={
                    {
                        cardHeader: [{
                            value: true,
                            avatar: (row) => `${process.env.REACT_APP_BASE_PUBLIC_URL}/${row.user.avatar}`,
                            title: (row) => row.title,
                            subheader: (row) => row.createdAt,
                            action: [
                                {
                                    label: 'Editer',
                                    handler: () => {
                                        console.log('TEUBE')
                                    }
                                },
                                {
                                    label: 'Supprimer',
                                    handler: () => {
                                        console.log("ZIGOUNETTE")
                                    }
                                }
                            ]
                        }],
                        cardMedia: (row) => row.photos ? `${process.env.REACT_APP_BASE_PUBLIC_URL}/${row.photos[0]}` : `${process.env.REACT_APP_BASE_PUBLIC_URL}/nature.jpg`,
                        cardContent: (row) => row.content,
                        cardActions: [
                            {
                                label: 'show',
                                icon: 'eye',
                                handler: () => {
                                    console.log("ALLO SALUT")
                                }
                            }
                        ],
                        params: {
                            query: {
                                perPage: 10,
                                page: 0,
                                order: ['createdAt', 'asc']
                            },
                            url: 'posts'
                        }
                    }
                }
            />
        </div>
    )

}

export default Posts

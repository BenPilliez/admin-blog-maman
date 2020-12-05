import React from "react"
import ReuseCardList from "../../custom/card/cardList"
import CustomDialog from "../../custom/customDialog";
import PostDetail from "./postsDetail";

const Posts = (props) => {

    const [openShow, setOpenShow] = React.useState(false)
    const [postId, setPostId] = React.useState()

    const handleClose = () => {
        setOpenShow(!openShow)
    }

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
                                handler: (id) => {
                                    setPostId(id)
                                    setOpenShow(true)
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

            <CustomDialog
                isOpen={openShow}
                fullScreen={true}
                handleClose={handleClose}
                title={'Detail Artcile'}>
                <PostDetail postId={postId} />
            </CustomDialog>
        </div>
    )

}

export default Posts

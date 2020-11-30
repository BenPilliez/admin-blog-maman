import React from "react"
import ReuseCardList from "../custom/cardList"

const Posts = () => {

    return(
        <div>
            <ReuseCardList
                options={
                    {
                        buttons:[
                            {
                                label: 'Editer'
                            },
                            {
                                label: 'Supprimer'
                            }
                        ],
                        params:{
                            query: {
                                perPage: 10,
                                page: 0
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

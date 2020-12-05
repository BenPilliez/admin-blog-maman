import React from "react"
import {connect} from "react-redux"

const PostDetail = (props) => {
    const {post} = props

    console.log(post)

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

const mapStateTopProps = (state, ownProps) => {
    const post = state.request.data.find(((item) => {
        return item.id === ownProps.postId
    }))
    return {
        post: post
    }
}

export default connect(mapStateTopProps)(PostDetail)

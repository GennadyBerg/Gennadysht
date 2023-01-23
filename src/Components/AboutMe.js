import { useSelector } from "react-redux"
import { useUserFindQuery } from "../reducers";
import { useParams } from "react-router-dom";

const User = ({ user }) => {
    return user && (
        <>
            <div>
                {user.nick}
            </div>

        </>
    )
}

const CUser = ({ }) => {
    const { _id } = useParams();
    const { isLoading, data } = useUserFindQuery(_id);
    let user = isLoading ? undefined : data?.UserFindOne;
    let currentUser = useSelector(state => state.auth.currentUser);
    user = _id ? user : currentUser;
    return <User user={user} />
}
export { CUser }
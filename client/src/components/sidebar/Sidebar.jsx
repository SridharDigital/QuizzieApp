import style from "./Sidebar.module.css"

import { useDispatch } from "react-redux"
import { openCreateQuizPopup } from "../../store/quizSlice"

const Sidebar = () => {
  const isActive = true
  const dispatch = useDispatch()

  const onClickCreateQuiz = () => {
    dispatch(openCreateQuizPopup())
  }
  return (
    <div className={style.sidebarContainer}>
      <h1 className={style.logo}>Quizzie</h1>
      <ul className={style.menuItemContainer}>
        <li
          className={`${style.menuItem} ${isActive ? style.navActive : null}`}
        >
          Dashboard
        </li>
        <li className={style.menuItem}>Analytics</li>
        <li className={style.menuItem}>Create Quiz</li>
      </ul>
      <div className={style.logoutSectionContainer}>
        <div className={style.hrLineDiv}>
          <hr />
        </div>
        <button className={style.sidebarLogoutBtn}>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort, faNoteSticky, faFile, faBook} from "@fortawesome/free-solid-svg-icons";

export const NavBarUnder = () => {
    return (
        <div className="down-under-ausie">
            <div className="icon-container">
                <FontAwesomeIcon icon={faFile} />
            </div>
            <div><input id="search-ds" placeholder="Search bar" /></div>
            <div className="icon-container">
                <FontAwesomeIcon icon={faSort} />
            </div>
        </div>
    );
};

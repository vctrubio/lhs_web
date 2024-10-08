
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
const items = [
    "eventos",
    "propiedades",
    "lifestyle",
]

const TopLogo = () => {
    return <div className="top-logo">
        <Link href="/">
            LHS
        </Link>
    </div>
}

const LeftFootBar = () => {
    return (
        <div className="call-to-action">
            <div>
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </div>
            <div>
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </div>
            <div>
                <FontAwesomeIcon icon={faPaperPlane} size="2x" />
            </div>
        </div>
    );
}

const NavBar = ({ flag }) => {
    return (
        <div >
            {flag && (
                <>
                    <TopLogo />
                    <LeftFootBar />
                </>
            )}
            <div className="six-ways">
                {items.map((item) => (
                    <Link href={`/${item}`} key={item}>
                        <div className="w-full h-full cursor-pointer">
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default NavBar;
// Header.jsx
import React, { useEffect, useRef, useState } from "react";
import css from "./Header.module.scss";
import { BiPhoneCall, BiMenuAltRight } from "react-icons/bi";
import { motion } from "framer-motion";
import { getMenuStyles, headerVariants } from "../../utils/motion";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import useHeaderShadow from "../../hooks/useHeaderShadow";

const Header = () => {
    const menuRef = useRef(null);
    const [menuOpened, setMenuOpened] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerShadow = useHeaderShadow();

    // to handle click outside of sidebar on mobile
    useOutsideAlerter({
        menuRef,
        setMenuOpened,
    });

    // to handle shadow on scroll
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const headerClasses = `${css.wrapper} ${scrolled ? 'scrolled' : ''}`;

    return (
        <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="show"
            className={`bg-primary paddings ${headerClasses}`}
            viewport={{ once: true, amount: 0.25 }}
            style={{ boxShadow: headerShadow }}
        >
            <div className={`innerWidth ${css.container} flexCenter`}>
                <div className={css.name}>Win.</div>
                <ul
                    className={`flexCenter ${css.menu}`}
                    ref={menuRef}
                    style={getMenuStyles(menuOpened)}
                >
                    <li><a href="#home">Home</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#footer">Contact</a></li>
                    <li className={`flexCenter ${css.phone}`}>
                        <p>+63 975 248 9509</p>
                        <BiPhoneCall size={"40px"} />
                    </li>
                </ul>

                {/* for medium and small screens */}
                <div
                    className={css.menuIcon}
                    onClick={() => setMenuOpened((prev) => !prev)}
                >
                    <BiMenuAltRight size={30} />
                </div>
            </div>
        </motion.div>
    );
};

export default Header;
import React from "react";


class Footer extends React.Component {

    render() {
        return <span>
            <hr className="border border-white mb-2"/>
            <footer className="text-center text-md m-2 text-white py-2"
                    style={{
                        position: 'relative',
                        bottom: '0',
                    }}>
                {new Date().getFullYear()} Sva prava zadržana <span className="font-bold"></span>
            </footer>
        </span>
    }
}

export default Footer;

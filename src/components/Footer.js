import React from "react";


class Footer extends React.Component {

    render() {
        return <span>
            <hr className="border border-white bg0w mb-2"/>
            <footer className="text-center bg-gray-100 text-md m-2 text-black py-2"
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

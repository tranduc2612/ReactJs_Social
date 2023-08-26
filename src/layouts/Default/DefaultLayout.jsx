function DefaultLayout({children}) {
    return ( <>
        <h1>Header</h1>
        {children}
        <h1>Footer</h1>
    </> );
}

export default DefaultLayout;
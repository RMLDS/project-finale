const Home = ({user}) => {
    return (
        <div className="links">
        {
            user ? <p>This is home page</p> : <p>Prašome prisijungti jei norite naudotis forumu.</p>
        }
    </div>
    );
}
 
export default Home;
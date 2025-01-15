import {Navbar} from "@/app/widgets/Navbar";
import {Footer} from "@/app/widgets/Footer";


type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
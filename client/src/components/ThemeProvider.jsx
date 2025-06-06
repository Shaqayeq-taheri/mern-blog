import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div className={theme}>
            <div className="bg-slate-50 text-gray-700 dark:text-gray-200 dark:bg-slate-700 min-h-screen">
                {children}
            </div>
        </div>
    );
}

export default ThemeProvider;

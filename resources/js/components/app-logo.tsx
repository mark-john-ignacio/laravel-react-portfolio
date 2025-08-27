import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex items-center">
                <AppLogoIcon className="h-8 w-8 shrink-0" />
                <span className="ml-2 font-mono text-sm tracking-wider text-[#64ffda]">PORTFOLIO</span>
            </div>
        </>
    );
}

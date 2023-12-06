import React from 'react';

const Index = (props) => {
    const {
        onHandleGetDataChooseSettingThemePages,
        chooseSettingThemePages,
        onHandleGetIsChooseSettingThemePages
    } = props
    return (
        <>
            <div className="theme-setting-wrapper">
                <div
                    onClick={() => onHandleGetIsChooseSettingThemePages(!chooseSettingThemePages)}
                    id="settings-trigger"><i className="ti-settings" /></div>
                <div id="theme-settings" className={chooseSettingThemePages ? "settings-panel open" : "settings-panel"}>
                    <i className="settings-close ti-close" onClick={() => onHandleGetIsChooseSettingThemePages(false)} />
                    <p className="settings-heading">SIDEBAR SKINS</p>
                    <div className="sidebar-bg-options selected" id="sidebar-light-theme"><div className="img-ss rounded-circle bg-light border mr-3" />Light</div>
                    <div className="sidebar-bg-options" id="sidebar-dark-theme"><div className="img-ss rounded-circle bg-dark border mr-3" />Dark</div>
                    <p className="settings-heading mt-2">HEADER SKINS</p>
                    <div className="color-tiles mx-0 px-4">
                        <div className="tiles success" onClick={() => onHandleGetDataChooseSettingThemePages("navbar-success")} />
                        <div className="tiles warning" onClick={() => onHandleGetDataChooseSettingThemePages("navbar-warning")} />
                        <div className="tiles danger" onClick={() => onHandleGetDataChooseSettingThemePages("navbar-danger")} />
                        <div className="tiles info" onClick={() => onHandleGetDataChooseSettingThemePages("navbar-info")} />
                        <div className="tiles dark" onClick={() => onHandleGetDataChooseSettingThemePages("navbar-dark")} />
                        <div className="tiles default" onClick={() => onHandleGetDataChooseSettingThemePages("")} />
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Index;

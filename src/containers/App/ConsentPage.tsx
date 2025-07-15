import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import BackIcon from '../../assets/images/back-icon.png';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n';
import {t} from "i18next";
import {ErrorLink} from "../ConfirmationScreen/style";

type CheckboxItem = {
    id: string;
    label: string;
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
};



const ConsentScreen: React.FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const isArabic = i18n.language === 'ar';
    const [ageConfirmed, setAgeConfirmed] = useState(false);
    const [consentGiven, setConsentGiven] = useState(false);
    const [privacyAck, setPrivacyAck] = useState(false);
    const [healthInfoConsent, setHealthInfoConsent] = useState(false);

    const checkboxes: CheckboxItem[] = [
        {
            id: 'ageConfirmed',
            label: t('consent.checkbox1'),
            state: ageConfirmed,
            setState: setAgeConfirmed,
        },
        {
            id: 'consentGiven',
            label: t('consent.checkbox2'),
            state: consentGiven,
            setState: setConsentGiven,
        },
        {
            id: 'privacyAck',
            label: t('consent.checkbox3'),
            state: privacyAck,
            setState: setPrivacyAck,
        },
        {
            id: 'healthInfoConsent',
            label: t('consent.checkbox4'),
            state: healthInfoConsent,
            setState: setHealthInfoConsent,
        },
    ];

    const Spacer = ({height}: { height: string }) => <div style={{height}}/>;

    const iframeStyle: React.CSSProperties = {
        height: '500px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        overflow: 'hidden',
    };

    if (window.innerWidth < 768) {
        iframeStyle.height = '250px';
    }

    const handleNext = () => {
        const allChecked =
            ageConfirmed && consentGiven && privacyAck && healthInfoConsent;

        if (allChecked) {
            navigate('/record-coughs');
        } else {
            alert(t('consent.check_all_alert'));
        }
    };

    const handleSignedPaperNext = () => {
        navigate('/record-coughs');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
            }}
        >
            <div
                style={{
                    padding: '1.8rem',
                    borderRadius: '0px',
                    width: '100%',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        padding: '0px 20px',
                        textAlign: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        onClick={handleBack}
                        style={{
                            position: 'absolute',
                            [isArabic ? 'right' : 'left']: '-10px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        aria-label={t('consent.back_aria')}
                    >
                        <img
                            src={BackIcon}
                            alt={t('consent.back_alt')}
                            style={{width: '25px', height: '35px', transform: isArabic ? 'rotate(180deg)' : 'none',}}
                        />
                    </button>
                    <h2
                        style={{
                            color: '#007bff',
                            margin: 0,
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '1rem',
                        }}
                    >
                        {t('consent.title')}
                    </h2>
                </div>


                <p style={{
                    marginTop: '3rem',
                    marginBottom: '2rem',
                    whiteSpace: 'pre-line',
                    fontSize: '1rem',
                    width: '100%'
                }}>
                    <u>{t('consent.description')}</u>
                </p>

                <div style={{marginBottom: '1.5rem', fontWeight: 'bold'}}>
                    <div style={{marginBottom: '1.5rem', whiteSpace: 'pre-line'}}>
                        {t('consent.dubaiHealthTitle')}<br/>
                        <span style={{fontWeight: 'normal', marginBottom: '2rem'}}>{t('consent.dubaiHealthDesc')}</span>
                        <Spacer height="1rem"/>
                        <a
                            href="https://docs.google.com/document/d/1c093C-aOUaxqWAUBodDc2QUtIHA8sfpA/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{color: '#000000', fontWeight: 'normal'}}
                        >
                            {t('consent.readFull')}
                        </a>
                        <Spacer height="1rem"/>
                        <div style={{...iframeStyle, marginTop: '1rem'}}>
                            <iframe
                                src="https://docs.google.com/document/d/1c093C-aOUaxqWAUBodDc2QUtIHA8sfpA/preview"
                                width="100%"
                                height="100%"
                                allow="autoplay"
                                style={{border: 'none'}}
                                title={t('consent.document_preview_title')}
                            ></iframe>
                        </div>
                    </div>


                    {t('consent.virufyTitle')}<br/>
                    <span style={{fontWeight: 'normal'}}>{t('consent.virufyDesc')}</span> <br/>
                    <Spacer height="1rem"/>
                    <a
                        href="https://drive.google.com/file/d/1hnxvDJ5qHBnUi7cnkNdyD4PuWMz8Ntss/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{color: '#000000', fontWeight: 'normal'}}
                    >
                        {t('consent.readFull')}
                    </a>
                    <Spacer height="1rem"/>
                    <div style={{...iframeStyle, marginTop: '1rem'}}>
                        <iframe
                            src="https://drive.google.com/file/d/1hnxvDJ5qHBnUi7cnkNdyD4PuWMz8Ntss/preview"
                            width="100%"
                            height="100%"
                            allow="autoplay"
                            style={{border: 'none'}}
                            title={t('consent.privacy_policy_preview_title')}
                        ></iframe>
                    </div>

                </div>

                <h4 style={{marginBottom: '0rem'}}>{t('consent.confirmationTitle')}</h4>
                <p style={{
                    fontSize: '0.95rem',
                    marginTop: '0rem',
                    marginBottom: '1rem'
                }}>{t('consent.confirmationDesc')}</p>

                <div style={{marginBottom: '1.5rem', paddingLeft: 0}}>
                    {checkboxes.map(({id, label, state, setState}) => (
                        <label
                            key={id}
                            htmlFor={id}
                            style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '0.75rem', paddingLeft: 0}}
                        >
                            <input
                                type="checkbox"
                                id={id}
                                checked={state}
                                onChange={() => setState(!state)}
                                style={{marginTop: '0.3rem', borderColor: '#222'}}
                            />{' '}
                            <span>{label}</span>
                        </label>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    width: '100%'
                }}>
                    <button
                        onClick={handleNext}
                        style={{
                            backgroundColor: "#3578de",
                            color: "white",
                            border: "none",
                            padding: "1.5rem",
                            borderRadius: "15px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        {t('consent.next')}
                    </button>

                    <button
                      onClick={handleSignedPaperNext}
                      style={{
                        backgroundColor: "#3578de",
                        color: "white",
                        border: "none",
                        padding: "1.5rem",
                        borderRadius: "15px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",           
                        justifyContent: "center",  
                        alignItems: "center",      
                      }}
                    >
                      <span style={{ direction: "rtl" }}>
                        {t("consent.nextPaper")}
                      </span>
                    </button>







                </div>
                <div style={{textAlign: "center"}}>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScYsWESIcn1uyEzFQT464qLSYZuUduHzThgTRPJODTQcCwz5w/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            color: "#3578de",
                            textDecoration: "underline",
                        }}
                    >
                        {t("recordBreath.reportIssue", "Something wrong? Report an error")}
                    </a>
                </div>

            </div>
        </div>
    );
};

export default ConsentScreen;
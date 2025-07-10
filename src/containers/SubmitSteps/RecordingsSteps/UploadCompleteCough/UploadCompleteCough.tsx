import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";



import {
  PageWrapper,
  ContentWrapper,
  Header,
  BackButton,
  HeaderTitle,
  Title,
  Subtitle,
  FileRow,
  Slider,
  TimeRow,
  PlayButton,
  RetakeButton,
  SubmitButton,
  Footer,
  ErrorLink,
  ButtonsWrapper,
  ControlsWrapper,
} from "./styles";

import ArrowLeftIcon from "../../../../assets/icons/arrowLeft.svg";
import PlayIcon from "../../../../assets/icons/play.svg";
import PauseIcon from "../../../../assets/icons/pause.svg";
import i18n from "../../../../i18n";

const UploadCompleteCough: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isArabic = i18n.language === "ar";


  const { t } = useTranslation();

  const {
    audioFileUrl,
    filename = t("uploadComplete.filename"),
    nextPage,
  } = location.state || {};
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => setDuration(audio.duration);
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleBack = () => navigate(-1);
  const handleRetake = () => navigate("/record-coughs");
  const handleSubmit = () => navigate(nextPage || "/confirmation");

  return (
    <PageWrapper>
      <ContentWrapper>
        <audio ref={audioRef} src={audioFileUrl || ""} preload="auto" />
        <Header>
        <BackButton
            onClick={handleBack}
            aria-label={t("uploadComplete.backAria")}
            isArabic={isArabic}  // Pass language direction here
        >
            <img
            src={ArrowLeftIcon}
            alt={t("uploadComplete.backAlt")}
            width={24}
            height={24}
            style={{ transform: isArabic ? "rotate(180deg)" : "none" }}
            />
        </BackButton>
        <HeaderTitle>{t("uploadComplete.title")}</HeaderTitle>
        </Header>

        <ControlsWrapper>
          <Title style={{ marginBottom: "2rem" }}>
            {t("uploadComplete.subtitle")}
          </Title>
          <Subtitle style={{ marginBottom: "2rem" }}>
            {t("uploadComplete.description")}
          </Subtitle>
          <FileRow>
            <span>{filename}</span>
            <span
              style={{
                fontSize: "20px",
                cursor: "pointer",
                alignSelf: "center",
              }}
            >
              ✕
            </span>
          </FileRow>
          <Slider
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            step="0.1"
            onChange={handleSeek}
            aria-label={t("uploadComplete.sliderAria")}
            style={{ marginTop: "2rem" }}
          />
          <TimeRow>
            <span>{formatTime(currentTime)}</span>
            <span>- {formatTime(duration)}</span>
          </TimeRow>
        </ControlsWrapper>
        <PlayButton
          onClick={handlePlayPause}
          aria-label={
            isPlaying ? t("uploadComplete.pause") : t("uploadComplete.play")
          }
        >
          <img
            src={isPlaying ? PauseIcon : PlayIcon}
            alt={
              isPlaying ? t("uploadComplete.pause") : t("uploadComplete.play")
            }
            width="45"
            height="45"
            style={isPlaying ? {} : { marginLeft: "0.3rem" }}
          />
        </PlayButton>

        {/* Added this button wrapper to center the buttons. */}
        <ButtonsWrapper>
          <RetakeButton onClick={handleRetake}>
            {t("uploadComplete.retake")}
          </RetakeButton>
          <SubmitButton onClick={handleSubmit}>
            {t("uploadComplete.submit")}
          </SubmitButton>
        </ButtonsWrapper>

        <Footer>
          <ErrorLink
            href="https://docs.google.com/forms/d/e/1FAIpQLScYsWESIcn1uyEzFQT464qLSYZuUduHzThgTRPJODTQcCwz5w/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("uploadComplete.report")}
          </ErrorLink>
        </Footer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default UploadCompleteCough;

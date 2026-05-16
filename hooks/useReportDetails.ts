import { useEffect, useState } from "react";
import {
  fetchReportById,
  
} from "@/services/reportsService";import { Audio } from "expo-av";
export const useReportDetails = (id: string,source?: string) => {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id || !source) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await fetchReportById(id, source);
        setReport(data);
      } catch (err) {
        console.log("fetch error:", err);
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, source]);

  const playAudio = async () => {
    if (!report?.audioUrl) return;

    try {
      setIsPlaying(true);

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: report.audioUrl,
      });

      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          newSound.unloadAsync();
        }
      });

      await newSound.playAsync();
    } catch (error) {
      console.log(error);
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
      setIsPlaying(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  return {
    report,
    loading,
    playAudio,
    isPlaying,
    stopAudio,
  };
};

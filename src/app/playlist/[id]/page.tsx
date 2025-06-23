"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";
import { Typography, Grid } from "antd";
import { SoundOutlined, BgColorsOutlined, ThunderboltOutlined } from "@ant-design/icons";
import SelectableTrackList from "@/app/components/SelectableTrackList";
import CoverGenerator from "@/app/components/CoverGenerator";
import StyleSelector from "@/app/components/StyleSelector";
import StepCard from "@/app/components/StepCard";
import StepsProgress from "@/app/components/StepsProgress";
import FloatingStepNav from "@/app/components/FloatingStepNav";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const PageContainer = styled.div`
  min-height: 100vh;
  
  padding: 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 48px;
  padding: 40px 0;
`;

const PlaylistTitle = styled(Title)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px !important;
  font-weight: 700;
`;







interface Track {
  name: string;
  artists: Array<{ name: string }>;
}

interface Playlist {
  images: Array<{ url: string }>;
  name: string;
  id: string;
}

interface SpotifyTrackItem {
  track: Track;
}

export default function PlaylistPage() {
  const { id } = useParams();
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [selectedStyleId, setSelectedStyleId] = useState("dynamic");
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  
  const screens = useBreakpoint();
  const isMobile = !!screens.xs;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksResponse, playlistResponse] = await Promise.all([
          fetch(`/api/spotify/playlists/${id}/tracks`),
          fetch(`/api/spotify/playlists/${id}`),
        ]);

        if (!tracksResponse.ok || !playlistResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const tracksData = await tracksResponse.json();
        const playlistData = await playlistResponse.json();
        
        const tracks = tracksData.items.map((item: SpotifyTrackItem) => item.track);
        setAllTracks(tracks);
        setSelectedTracks(tracks.slice(0, 10));
        
        setPlaylist({
          ...playlistData,
          id: id as string
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCoverUpdate = async (imageBase64: string) => {
    const response = await fetch(`/api/spotify/playlists/${id}/cover`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!response.ok) {
      throw new Error("Failed to update playlist cover");
    }
  };

  const handleTrackSelectionChange = (newSelectedTracks: Track[]) => {
    setSelectedTracks(newSelectedTracks);
  };

  if (!playlist) {
    return null;
  }

  // Calculate step completion
  const isStep1Complete = selectedTracks.length > 0;
  const isStep2Complete = selectedStyleId !== "";
  const isStep3Ready = isStep1Complete && isStep2Complete;

  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <PlaylistTitle level={isMobile ? 3 : 1}>
            {playlist?.name}
          </PlaylistTitle>
          <Paragraph style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', margin: '0 auto' }}>
            Transform your playlist into a stunning visual experience with AI-powered cover generation
          </Paragraph>
        </HeaderSection>

        <StepsProgress
          currentStep={isStep3Ready ? 2 : isStep2Complete ? 1 : 0}
          steps={[
            {
              title: 'Select Tracks',
              description: `${selectedTracks.length} tracks selected`,
              icon: <SoundOutlined />,
            },
            {
              title: 'Choose Style',
              description: 'AI art style selected',
              icon: <BgColorsOutlined />,
            },
            {
              title: 'Generate Cover',
              description: 'Create your masterpiece',
              icon: <ThunderboltOutlined />,
            },
          ]}
        />

                {/* Step 1: Track Selection */}
        <div id="step-tracks">
          <StepCard
            title="Select Your Tracks"
            description="Choose the songs that define your playlist's mood"
            icon={<SoundOutlined />}
            active={!isStep1Complete}
            completed={isStep1Complete}
            showProgress={true}
            progressCount={selectedTracks.length}
            progressLabel="Selected"
          >
            <SelectableTrackList 
              tracks={allTracks}
              loading={loading}
              selectedTracks={selectedTracks}
              onSelectionChange={handleTrackSelectionChange}
            />
          </StepCard>
        </div>

        {/* Step 2: Style Selection */}
        <div id="step-style">
          <StepCard
            title="Choose Your Style"
            description="Select an AI art style that matches your playlist's vibe"
            icon={<BgColorsOutlined />}
            active={isStep1Complete && !isStep2Complete}
            completed={isStep2Complete}
          >
            <StyleSelector 
              selectedStyleId={selectedStyleId}
              onStyleChange={setSelectedStyleId}
            />
          </StepCard>
        </div>
        
        {/* Step 3: Cover Generation */}
        <div id="step-generate">
          <StepCard
            title="Generate Your Cover"
            description="Create and apply your AI-generated playlist cover"
            icon={<ThunderboltOutlined />}
            active={isStep3Ready}
          >
            <CoverGenerator
              playlist={playlist}
              tracks={selectedTracks}
              selectedStyleId={selectedStyleId}
              onCoverUpdate={handleCoverUpdate}
            />
          </StepCard>
        </div>

        {/* Floating Step Navigation */}
        <FloatingStepNav
          steps={[
            {
              anchor: "step-tracks",
              title: "Select Your Tracks",
              icon: <SoundOutlined />,
              completed: isStep1Complete,
              active: !isStep1Complete,
            },
            {
              anchor: "step-style",
              title: "Choose Your Style",
              icon: <BgColorsOutlined />,
              completed: isStep2Complete,
              active: isStep1Complete && !isStep2Complete,
            },
            {
              anchor: "step-generate",
              title: "Generate Your Cover",
              icon: <ThunderboltOutlined />,
              completed: false,
              active: isStep3Ready,
            },
          ]}
        />
      </ContentWrapper>
    </PageContainer>
  );
}

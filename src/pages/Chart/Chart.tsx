import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import type {
  CoffeeBrand,
  CoffeeConsumptionResponse,
  WeeklyMood,
} from '../../types/chart';

import apiClient from '../../api/client';
import * as S from './Chart.styles';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type TabType = 'coffee-brands' | 'mood-trend' | 'coffee-consumption';

const Chart = () => {
  const [activeTab, setActiveTab] = useState<TabType>('coffee-brands');
  const [coffeeBrands, setCoffeeBrands] = useState<CoffeeBrand[]>([]);
  const [moodTrend, setMoodTrend] = useState<WeeklyMood[]>([]);
  const [coffeeConsumption, setCoffeeConsumption] =
    useState<CoffeeConsumptionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [brandsRes, moodRes, consumptionRes] = await Promise.all([
          apiClient.get<CoffeeBrand[]>('/mock/top-coffee-brands'),
          apiClient.get<WeeklyMood[]>('/mock/weekly-mood-trend'),
          apiClient.get<CoffeeConsumptionResponse>('/mock/coffee-consumption'),
        ]);

        setCoffeeBrands(brandsRes.data);
        setMoodTrend(moodRes.data);
        setCoffeeConsumption(consumptionRes.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Coffee Brands Bar Chart
  const coffeeBrandsBarData = {
    labels: coffeeBrands.map((item) => item.brand),
    datasets: [
      {
        label: '인기도',
        data: coffeeBrands.map((item) => item.popularity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Coffee Brands Donut Chart
  const coffeeBrandsDonutData = {
    labels: coffeeBrands.map((item) => item.brand),
    datasets: [
      {
        label: '인기도',
        data: coffeeBrands.map((item) => item.popularity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Weekly Mood Stacked Bar Chart
  const moodStackedBarData = {
    labels: moodTrend.map((item) => item.week),
    datasets: [
      {
        label: 'Happy',
        data: moodTrend.map((item) => item.happy),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
      {
        label: 'Tired',
        data: moodTrend.map((item) => item.tired),
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
      {
        label: 'Stressed',
        data: moodTrend.map((item) => item.stressed),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  const stackedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        ticks: {
          callback(value: any) {
            return `${value}%`;
          },
        },
      },
    },
  };

  // Weekly Mood Stacked Area Chart
  const moodStackedAreaData = {
    labels: moodTrend.map((item) => item.week),
    datasets: [
      {
        label: 'Happy',
        data: moodTrend.map((item) => item.happy),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
      },
      {
        label: 'Tired',
        data: moodTrend.map((item) => item.tired),
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: true,
      },
      {
        label: 'Stressed',
        data: moodTrend.map((item) => item.stressed),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: true,
      },
    ],
  };

  const stackedAreaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        ticks: {
          callback(value: any) {
            return `${value}%`;
          },
        },
      },
    },
  };

  // Coffee Consumption Multi-line Chart
  const colors = [
    { bugs: 'rgba(255, 99, 132, 1)', productivity: 'rgba(255, 99, 132, 0.6)' },
    { bugs: 'rgba(54, 162, 235, 1)', productivity: 'rgba(54, 162, 235, 0.6)' },
    { bugs: 'rgba(75, 192, 192, 1)', productivity: 'rgba(75, 192, 192, 0.6)' },
  ];

  const coffeeConsumptionData = coffeeConsumption
    ? {
        labels: coffeeConsumption.teams[0].series.map(
          (item) => `${item.cups}잔`,
        ),
        datasets: coffeeConsumption.teams.flatMap((team, index) => [
          {
            label: `${team.team} - 버그 수`,
            data: team.series.map((item) => item.bugs),
            borderColor: colors[index].bugs,
            backgroundColor: colors[index].bugs,
            borderWidth: 2,
            pointStyle: 'circle' as const,
            pointRadius: 6,
            yAxisID: 'y-bugs',
            borderDash: [],
          },
          {
            label: `${team.team} - 생산성`,
            data: team.series.map((item) => item.productivity),
            borderColor: colors[index].productivity,
            backgroundColor: colors[index].productivity,
            borderWidth: 2,
            borderDash: [5, 5],
            pointStyle: 'rect' as const,
            pointRadius: 6,
            yAxisID: 'y-productivity',
          },
        ]),
      }
    : { labels: [], datasets: [] };

  const multiLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          title(context: any) {
            return `커피 섭취량: ${context[0].label}`;
          },
          label(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label.includes('버그')) {
              return `${label}: ${value}개`;
            }
            return `${label}: ${value}점`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '커피 섭취량 (잔/일)',
        },
      },
      'y-bugs': {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '버그 수',
        },
      },
      'y-productivity': {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: '생산성 점수',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <S.Container>
        <S.Title>데이터 시각화</S.Title>
        <S.LoadingText>데이터를 불러오는 중...</S.LoadingText>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.Title>데이터 시각화</S.Title>
        <S.ErrorText>에러가 발생했습니다: {error}</S.ErrorText>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>데이터 시각화</S.Title>

      <S.TabContainer>
        <S.Tab
          active={activeTab === 'coffee-brands'}
          onClick={() => setActiveTab('coffee-brands')}
        >
          인기 커피 브랜드
        </S.Tab>
        <S.Tab
          active={activeTab === 'mood-trend'}
          onClick={() => setActiveTab('mood-trend')}
        >
          주간 무드 트렌드
        </S.Tab>
        <S.Tab
          active={activeTab === 'coffee-consumption'}
          onClick={() => setActiveTab('coffee-consumption')}
        >
          커피 소비와 생산성
        </S.Tab>
      </S.TabContainer>

      {activeTab === 'coffee-brands' && (
        <S.ChartsGrid>
          <S.ChartContainer>
            <S.ChartTitle>바 차트</S.ChartTitle>
            <S.ChartWrapper>
              <Bar
                data={coffeeBrandsBarData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </S.ChartWrapper>
          </S.ChartContainer>

          <S.ChartContainer>
            <S.ChartTitle>도넛 차트</S.ChartTitle>
            <S.ChartWrapper>
              <Doughnut
                data={coffeeBrandsDonutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </S.ChartWrapper>
          </S.ChartContainer>
        </S.ChartsGrid>
      )}

      {activeTab === 'mood-trend' && (
        <S.ChartsGrid>
          <S.ChartContainer>
            <S.ChartTitle>스택형 바 차트</S.ChartTitle>
            <S.ChartWrapper>
              <Bar data={moodStackedBarData} options={stackedBarOptions} />
            </S.ChartWrapper>
          </S.ChartContainer>

          <S.ChartContainer>
            <S.ChartTitle>스택형 면적 차트</S.ChartTitle>
            <S.ChartWrapper>
              <Line data={moodStackedAreaData} options={stackedAreaOptions} />
            </S.ChartWrapper>
          </S.ChartContainer>
        </S.ChartsGrid>
      )}

      {activeTab === 'coffee-consumption' && (
        <S.ChartContainer>
          <S.ChartTitle>팀별 커피 소비량과 버그/생산성 관계</S.ChartTitle>
          <S.ChartWrapper>
            <Line data={coffeeConsumptionData} options={multiLineOptions} />
          </S.ChartWrapper>
        </S.ChartContainer>
      )}
    </S.Container>
  );
};

export default Chart;

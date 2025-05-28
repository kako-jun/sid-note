// functionalHarmonyごとのhue-rotate値とblur有無を返す関数
export const getFunctionalHarmonyFilter = (functionalHarmony: number) => {
  // functionalHarmony: 1~7
  // 1:140, 2:350, 3:230, 4:180, 5:290, 6:180, 7:330
  const degMap: Record<number, number> = {
    1: 140,
    2: 350,
    3: 230,
    4: 180,
    5: 290,
    6: 180,
    7: 330,
  };
  const deg = degMap[functionalHarmony] ?? 0;
  const blur = functionalHarmony === 3 ? " blur(1px)" : "";
  return `invert(50%) sepia(100%) saturate(200%) hue-rotate(${deg}deg)${blur}`;
};

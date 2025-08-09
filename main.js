// addProtocolの設定
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

// マップの初期化
const map = new maplibregl.Map({
  container: 'map',
  style: './std.json',
  hash: true,
  zoom: 16.75,
  center: [129.867164, 32.750944],
  pitch: 69,
  maxPitch: 85,
  bearing: 29.7,
  attributionControl: false,
})

// ズーム・回転
map.addControl(new maplibregl.NavigationControl());

// フルスクリーンモードのオンオフ
map.addControl(new maplibregl.FullscreenControl());

// 現在位置表示
map.addControl(new maplibregl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: false
  },
  fitBoundsOptions: { maxZoom: 18 },
  trackUserLocation: true,
  showUserLocation: true
}));

// スケール表示
map.addControl(new maplibregl.ScaleControl({
  maxWidth: 200,
  unit: 'metric'
}));

// Attributionを折りたたみ表示
map.addControl(new maplibregl.AttributionControl({
  compact: true,
  customAttribution: '<a href="https://twitter.com/shi__works" target="_blank">Twitter</a> | <a href="https://github.com/shi-works/nagasaki-point-cloud-map-on-maplibre-gl-js-demo" target="_blank">Github</a> | <a href="https://opennagasaki.nerc.or.jp/" target="_blank">オープンナガサキ</a> '
}));

map.on('load', () => {
  // MapboxLayerを使ったインターリーブ
  const tile3dLayer = new deck.MapboxLayer({
    id: "nagasaki-station",
    type: deck.Tile3DLayer,
    pointSize: 2,
    // 3次元点群データ（3DTiles）ソース
    data: 'https://xs489works.xsrv.jp/3dtiles/open_nagasaki/nagasaki_station/tileset.json',
    loader: Tiles3DLoader
  });

  // 3次元点群データ（3DTiles）レイヤ
  map.addLayer(tile3dLayer);

})

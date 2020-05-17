import { subwayLinesItemTemplate } from "../../utils/templates.js";
import { defaultSubwayLines } from "../../utils/subwayMockData.js";
import tns from "../../lib/slider/tiny-slider.js";
import { EVENT_TYPE, ERROR_MESSAGE } from "../../utils/constants.js";
import CreateSubWayEdgeModal from "../../ui/CreateSubwayEdgeModal.js"
import api from "../../api/index.js";

function AdminEdge() {
  const $subwayLinesSlider = document.querySelector(".subway-lines-slider");
  const subwayEdgeModal = new CreateSubWayEdgeModal();

  let subwayLines = [];
  let stations = []

  const initSubwayLinesSlider = () => {
    $subwayLinesSlider.innerHTML = subwayLines
      .map(line => subwayLinesItemTemplate(line))
      .join("");
    tns({
      container: ".subway-lines-slider",
      loop: true,
      slideBy: "page",
      speed: 400,
      autoplayButtonOutput: false,
      mouseDrag: true,
      lazyload: true,
      controlsContainer: "#slider-controls",
      items: 1,
      edgePadding: 0
    });
  };

  const onRemoveStationHandler = async event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      const $stationItem = $target.closest(".list-item");
      const $lineItem = $target.closest("[data-line-id");
      const { stationId } = $stationItem.dataset;
      const { lineId } = $lineItem.dataset;
      await api.edge.delete(lineId, stationId);
      $target.closest(".list-item").remove();
    }
  };

  const convertToId = (stationName, required = true) => {
    const station = stations.find(station => station.name === stationName);
    if (station) {
      return station.id;
    }
    if (required) {
      throw new Error(ERROR_MESSAGE.NOT_FOUND);
    }
  };

  const onCreateEdge = async data => {
    try {
      const convertData = {
        preStationId: convertToId(data.preStation, false),
        stationId: convertToId(data.station),
        distance: 10,
        duration: 10
      };
      await api.edge.create(convertData, data.lineId);
      await initState();
      initSubwayLinesSlider();
      subwayEdgeModal.toggle();
    } catch (e) {
      alert(e.message);
    }
  };

  const initEventListeners = () => {
    $subwayLinesSlider.addEventListener(
      EVENT_TYPE.CLICK,
      onRemoveStationHandler
    );
    subwayEdgeModal.on("submit", onCreateEdge);
  };

  const initState = async () => {
    subwayLines = await api.edge.get();
    stations = await api.station.get();
  };

  this.init = async () => {
    await initState();
    initSubwayLinesSlider();
    subwayEdgeModal.init(subwayLines);
    initEventListeners();
  };
}

const adminEdge = new AdminEdge();
adminEdge.init();
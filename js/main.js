// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.

var pixel;
var context = {
    initMouse: {
        x: null,
        y: null
    },
    initCanvasPos: {
        x: null,
        y: null
    },
    lastMouse: {
        x: null,
        y: null
    },
    shouldMove: false,
    hiddenCanvasCtx: null,
    CanvasCtx: null,
    createdLayoutCount: 0,
    initLayoutOffset: null,
    screen: null
}

var liveBuffer = [];
var liveInterval = null;
var pixelArray;

var iconCode = [
    '26e', '2b9', '2ba', '2bb', '2bc', '042', '170', '037', '039', '036',
    '038', '270', '0f9', '2a3', '13d', '17b', '209', '103', '100', '101',
    '102', '107', '104', '105', '106', '179', '187', '1fe', '0ab', '0a8',
    '01a', '190', '18e', '01b', '0a9', '0aa', '063', '060', '061', '062',
    '047', '0b2', '07e', '07d', '2a2', '069', '1fa', '29e', '1b9', '04a',
    '24e', '05e', '2d5', '19c', '080', '02a', '0c9', '2cd', '240', '244',
    '243', '242', '241', '236', '0fc', '1b4', '1b5', '0f3', '0a2', '1f6',
    '1f7', '206', '1e5', '1fd', '171', '172', '15a', '27e', '29d', '293',
    '294', '032', '0e7', '1e2', '02d', '02e', '097', '2a1', '0b1', '188',
    '1ad', '0f7', '0a1', '140', '207', '20d', '1ba', '1ec', '073', '274',
    '272', '133', '271', '273', '030', '083', '0d7', '0d9', '0da', '150',
    '191', '152', '151', '0d8', '218', '217', '20a', '1f3', '24c', '1f2',
    '24b', '1f1', '1f4', '1f5', '1f0', '0a3', '0c1', '127', '00c', '058',
    '05d', '14a', '046', '13a', '137', '138', '139', '078', '053', '054',
    '077', '1ae', '268', '111', '10c', '1ce', '1db', '0ea', '017', '24d',
    '00d', '0c2', '0ed', '0ee', '157', '121', '126', '1cb', '284', '0f4',
    '013', '085', '0db', '075', '0e5', '27a', '27b', '086', '0e6', '14e',
    '066', '20e', '26d', '0c5', '1f9', '25e', '09d', '283', '125', '05b',
    '13c', '1b2', '1b3', '0c4', '0f5', '0e4', '210', '1c0', '2a4', '03b',
    '1a5', '108', '1bd', '219', '1a6', '155', '192', '019', '17d', '2c2',
    '2c3', '16b', '1a9', '282', '044', '2da', '052', '141', '142', '1d1',
    '0e0', '003', '2b6', '2b7', '199', '299', '12d', '2d7', '153', '0ec',
    '12a', '06a', '071', '065', '23e', '08e', '14c', '06e', '070', '1fb',
    '2b4', '09a', '230', '082', '049', '050', '1ac', '09e', '182', '0fb',
    '15b', '1c6', '1c7', '1c9', '1c3', '1c5', '1c8', '016', '1c1', '1c4',
    '15c', '0f6', '1c2', '008', '0b0', '06d', '134', '269', '2b0', '024',
    '11e', '11d', '0c3', '16e', '0c7', '07b', '114', '07c', '115', '031',
    '280', '286', '211', '04e', '180', '2c5', '119', '1e3', '11b', '0e3',
    '154', '22d', '265', '260', '261', '06b', '1d3', '1d2', '09b', '113',
    '092', '296', '184', '000', '2a5', '2a6', '0ac', '1a0', '0d5', '2b3',
    '0d4', '1ee', '19d', '2d6', '0c0', '0fd', '1d4', '255', '258', '0a7',
    '0a5', '0a4', '0a6', '256', '25b', '25a', '257', '259', '2b5', '292',
    '0a0', '1dc', '025', '004', '08a', '21e', '1da', '015', '0f8', '254',
    '251', '252', '253', '250', '27c', '13b', '246', '2c1', '20b', '03e',
    '2d8', '01c', '03c', '275', '129', '05a', '156', '16d', '26b', '224',
    '208', '033', '1aa', '1cc', '084', '11c', '159', '1ab', '109', '202',
    '203', '06c', '212', '094', '149', '148', '1cd', '0eb', '201', '0e1',
    '08c', '2b8', '17c', '03a', '022', '0cb', '0ca', '124', '023', '175',
    '177', '178', '176', '2a8', '0d0', '076', '064', '112', '122', '183',
    '279', '041', '278', '276', '277', '222', '227', '229', '22b', '22a',
    '136', '20c', '23a', '0fa', '2e0', '11a', '223', '2db', '130', '131',
    '068', '056', '146', '147', '289', '10b', '285', '0d6', '186', '21c',
    '245', '001', '22c', '1ea', '247', '248', '263', '264', '23d', '19b',
    '26a', '23c', '18c', '1fc', '1d8', '1d9', '0c6', '1dd', '04c', '28b',
    '28c', '1b0', '1ed', '040', '14b', '295', '095', '098', '200', '2ae',
    '1a8', '1a7', '0d2', '231', '0d3', '072', '04b', '144', '01d', '1e6',
    '067', '055', '0fe', '196', '2ce', '011', '02f', '288', '12e', '1d6',
    '029', '128', '059', '29c', '2c4', '10d', '10e', '1d0', '074', '2d9',
    '1b8', '1a1', '281', '1a2', '021', '25d', '18b', '01e', '079', '018',
    '135', '0e2', '158', '143', '267', '28a', '002', '010', '00e', '213',
    '233', '1e0', '1e1', '14d', '045', '132', '21a', '214', '290', '291',
    '07a', '2cc', '090', '2a7', '08b', '012', '215', '0e8', '216', '17e',
    '198', '1de', '1e7', '118', '2ab', '2ac', '2ad', '2dc', '0dc', '15d',
    '15e', '160', '161', '0de', '0dd', '162', '163', '1be', '197', '110',
    '1b1', '1bc', '0c8', '096', '18d', '16c', '005', '089', '123', '006',
    '1b6', '1b7', '048', '051', '0f1', '249', '24a', '04d', '28d', '28e',
    '21d', '0cc', '1a4', '1a3', '12c', '239', '0f2', '185', '2dd', '12b',
    '0ce', '10a', '02b', '02c', '0ae', '2c6', '26c', '1d5', '120', '034',
    '035', '00a', '009', '00b', '2b2', '2c7', '2cb', '2ca', '2c9', '2c8',
    '08d', '165', '088', '087', '164', '145', '057', '05c', '2d3', '2d4',
    '043', '204', '205', '25c', '238', '225', '1f8', '014', '1bb', '181',
    '262', '091', '0d1', '195', '1e4', '173', '174', '1e8', '099', '081',
    '0e9', '0cd', '29a', '09c', '13e', '093', '287', '007', '2bd', '2be',
    '0f0', '2c0', '234', '21b', '235', '221', '226', '228', '237', '2a9',
    '2aa', '03d', '27d', '194', '1ca', '189', '2a0', '027', '026', '028',
    '1d7', '18a', '232', '193', '29b', '1eb', '266', '2d0', '2d1', '2d2',
    '17a', '19a', '297', '2de', '298', '0ad', '168', '169', '23b', '19e',
    '1e9', '2b1', '167', '16a', '166'];

function init() {
    pixel = new Vue({
        el: '#app',
        data: {
            canvas: getInitialCanvas(),
            tool: {
                value: 'pointer'
            },
            scaleRatio: {
                value: getInitialScaleRatio()
            },
            canvasScaleRatio: {
                value: 100
            },
            layouts: [],
            layoutList: {
                value: []
            },
            currentLayout: {
                value: null,
                show: true
            },
            currentLayoutOffset: {
                x: 0,
                y: 0
            },
            insertedImage: {
                width: 0,
                height: 0,
                _width: 0,
                _height: 0,
                threshold: 128,
                image: null
            },
            cropBox: {
                _width: 0,
                _height: 0,
                _top: -10000,
                _left: 0,
                width: 0,
                height: 0,
                top: 0,
                left: 0
            },
            clipboard: {
                x: null,
                y: null,
                image: null
            },
            code: {
                show: false,
                value: null
            },
            icons: {
                show: false,
                code: iconCode,
                size: 32,
                vsIconTotal: 1582
            },
            showDevKit: {
                value: false
            },
            devkitIP: {
                buffer: '',
                value: '',
                show: false,
                info: ''
            },
        },
        methods: {
            isCurrent: isCurrent,
            selectLayout: selectLayout,
            createLayout: createLayout,
            copyLayout: copyLayout,
            removeLayout: removeLayout,
            save: save,
            closeIcons: closeIcons,
            closePicture: closePicture,
            updatePictureSize: updatePictureSize,
            updatePreviewCanvas: updatePreviewCanvas,
            insertImage: insertImage,
            mergeLayout: mergeLayout,
            showLayout: showLayout,
            showDevKitPreview: showDevKitPreview,
            invertLayout: invertLayout,
            vsIconName: vsIconName,
            liveView: liveView,
            updateDevKitIP: updateDevKitIP,
            closeDevKitIP: closeDevKitIP,
            showDevKitIP: showDevKitIP
        },
        watch: {
            'insertedImage.threshold': function() {
                pixel.updatePreviewCanvas(pixel.insertedImage.width, pixel.insertedImage.height);
            }
        }
    });

    context.hiddenCanvasCtx = document.getElementById('hiddenCanvas').getContext("2d");
    context.hiddenCanvasCtx.fillStyle = "#000000";
    context.CanvasCtx = document.getElementById('mainCanvas').getContext("2d");
    context.CanvasCtx.fillStyle = "#000000";
    context.screen = new Screen(document.getElementById('oled'));

    createLayout();

    jQuery('#pixelBackground').mousedown(function(event) {
        context.initMouse.x = event.pageX;
        context.initMouse.y = event.pageY;
        context.initCanvasPos.x = pixel.canvas.left;
        context.initCanvasPos.y = pixel.canvas.top;
        if (pixel.currentLayout.show || pixel.tool.value === 'move') {
            context.shouldMove = true;
        } else {
            return;
        }
        
        if (pixel.tool.value === 'brush') {
            drawDot(event);
        } else if (pixel.tool.value === 'erase') {
            erase(event);
        } else if (pixel.tool.value === 'pointer') {
            context.initLayoutOffset = pixel.currentLayoutOffset;
        } else if (pixel.tool.value === 'crop') {
            var offset = $('#hiddenCanvas').offset();
            var x = Math.floor((event.pageX - offset.left) / pixel.scaleRatio.value);
            var y = Math.floor((event.pageY - offset.top) / pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, '_left', x * pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, '_top', y * pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, '_width', pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, '_height', pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, 'left', x);
            Vue.set(pixel.cropBox, 'top', y);
            Vue.set(pixel.cropBox, 'width', 1);
            Vue.set(pixel.cropBox, 'height', 1);
        }
    });

    jQuery('#pixelBackground').mouseup(function(event) {
        context.shouldMove = false;
    });

    jQuery('#pixelBackground').mouseleave(function(event) {
        context.shouldMove = false;
    });

    jQuery('#pixelBackground').click(function(event) {
        if (pixel.tool.value === 'zoomin') {
            zoomIn();
        } else if (pixel.tool.value === 'zoomout') {
            zoomOut();
        }
    });

    jQuery('#insert_image').change(function(event) {
        pixel.insertedImage.image = new Image();
        pixel.insertedImage.image.src = URL.createObjectURL(event.target.files[0]);
        pixel.insertedImage.image.onload = initPreviewImage;
        document.getElementById('insert_image').value = '';
    });

    jQuery('#open_file').change(function(event) {
        var fr = new FileReader();
        fr.onload = function(event) {
            document.getElementById('open_file').value = '';

            try {
                var dkpObj = JSON.parse(LZString.decompressFromUint8Array(new Uint8Array(event.target.result)));
            } catch(error) {
                alert('Broken DevKit Pixel file.');
                return;
            }
            
            if (!confirm('Do you confirm to open the new file? Your unsaved change will be lost.')) {
                return;
            }

            loadData(dkpObj);
        };
        fr.readAsArrayBuffer(event.target.files[0]);
    });

    jQuery('#cppCode').click(function() {
        jQuery(this).select();
    });

    jQuery(document).on('mousemove', function(event) {
        if (pixel.tool.value === 'move' && context.shouldMove) {
            Vue.set(pixel.canvas, 'left', context.initCanvasPos.x + event.pageX - context.initMouse.x);
            Vue.set(pixel.canvas, 'top', context.initCanvasPos.y + event.pageY - context.initMouse.y);
            updateCurrentLayout();
        } else if (pixel.tool.value === 'brush' && context.shouldMove) {
            drawLine(event);
        } else if (pixel.tool.value === 'erase' && context.shouldMove) {
            erase(event);
        } else if (pixel.tool.value === 'pointer' && context.shouldMove) {
            var offsetX = context.initLayoutOffset.x + Math.round((event.pageX - context.initMouse.x) / pixel.scaleRatio.value);
            var offsetY = context.initLayoutOffset.y + Math.round((event.pageY - context.initMouse.y) / pixel.scaleRatio.value);
            pixel.currentLayoutOffset = {
                x: offsetX,
                y: offsetY
            }
            updateCanvas();
            updateCurrentLayout(offsetX, offsetY);
        } else if (pixel.tool.value === 'crop' && context.shouldMove) {
            var offset = $('#hiddenCanvas').offset();
            var x = Math.ceil((event.pageX - offset.left) / pixel.scaleRatio.value);
            var y = Math.ceil((event.pageY - offset.top) / pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, '_width', x * pixel.scaleRatio.value - pixel.cropBox._left);
            Vue.set(pixel.cropBox, '_height', y * pixel.scaleRatio.value - pixel.cropBox._top);
            Vue.set(pixel.cropBox, 'width', x - pixel.cropBox.left);
            Vue.set(pixel.cropBox, 'height', y - pixel.cropBox.top);
        }
    });

    jQuery(document).on('mousedown', function(event) {
        if (pixel.tool.value === 'pointer' && context.shouldMove === false) {
            checkOffset();
        }

        if (pixel.tool.value !== 'crop') {
            pixel.cropBox = {
                _width: 0,
                _height: 0,
                _top: -10000,
                _left: 0,
                width: 0,
                height: 0,
                top: 0,
                left: 0
            };
        }
    });

    jQuery(document).on('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.which === 65 && !pixel.code.show) {
            if (pixel.tool.value === 'pointer') {
                checkOffset();
            }

            Vue.set(pixel.tool, 'value', 'crop');
            var offset = $('#hiddenCanvas').offset();
            var x = Math.floor((event.pageX - offset.left) / pixel.scaleRatio.value);
            var y = Math.floor((event.pageY - offset.top) / pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, '_left', 0);
            Vue.set(pixel.cropBox, '_top', 0);
            Vue.set(pixel.cropBox, '_width', 128 * pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, '_height', 64 * pixel.scaleRatio.value);
            Vue.set(pixel.cropBox, 'left', 0);
            Vue.set(pixel.cropBox, 'top', 0);
            Vue.set(pixel.cropBox, 'width', 128);
            Vue.set(pixel.cropBox, 'height', 64);
        } else if ((event.ctrlKey || event.metaKey) && event.which === 86) {
            if (pixel.tool.value === 'pointer') {
                checkOffset();
            }
            var currentLayout = getCurrentLayout();
            var currentContext = currentLayout.getContext('2d');
            currentContext.drawImage(pixel.clipboard.image, pixel.clipboard.x, pixel.clipboard.y, pixel.clipboard.w, pixel.clipboard.h, pixel.clipboard.x, pixel.clipboard.y, pixel.clipboard.w, pixel.clipboard.h);
            context.hiddenCanvasCtx.drawImage(pixel.clipboard.image, pixel.clipboard.x, pixel.clipboard.y, pixel.clipboard.w, pixel.clipboard.h, pixel.clipboard.x, pixel.clipboard.y, pixel.clipboard.w, pixel.clipboard.h);
            updateLayoutList();
            updateCanvas();
        } else if (event.shiftKey && event.which === 78) {
            if (pixel.tool.value === 'pointer') {
                checkOffset();
            }
            createLayout()
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 79) {
            $('#open_file').click();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 80) {
            getPixelCode();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 83) {
            save();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 69) {
            mergeLayout();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 72) {
            showLayout(pixel.currentLayout.value);
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 189) {
            zoomOut();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 187) {
            zoomIn();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 48) {
            zoom();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 74) {
            copyLayout();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 68) {
            removeLayout();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 73) {
            invertLayout();
            event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.which === 76) {
            showDevKitPreview();
            event.preventDefault();
        } else if (pixel.tool.value === 'crop' && (event.ctrlKey || event.metaKey) && event.which === 67 && pixel.cropBox.width > 0 && pixel.cropBox.height > 0) {
            var currentLayout = getCurrentLayout();
            pixel.clipboard.x = pixel.cropBox.left;
            pixel.clipboard.y = pixel.cropBox.top;
            pixel.clipboard.w = pixel.cropBox.width;
            pixel.clipboard.h = pixel.cropBox.height;
            pixel.clipboard.image = new Image();
            pixel.clipboard.image.src = currentLayout.toDataURL();
            Vue.set(pixel.tool, 'value', 'pointer');
        } else if (pixel.tool.value === 'crop' && (event.ctrlKey || event.metaKey) && event.which === 88 && pixel.cropBox.width > 0 && pixel.cropBox.height > 0) {
            var currentLayout = getCurrentLayout();
            var currentContext = currentLayout.getContext('2d');
            pixel.clipboard.x = pixel.cropBox.left;
            pixel.clipboard.y = pixel.cropBox.top;
            pixel.clipboard.w = pixel.cropBox.width;
            pixel.clipboard.h = pixel.cropBox.height;
            pixel.clipboard.image = new Image();
            pixel.clipboard.image.src = currentLayout.toDataURL();
            currentContext.clearRect(pixel.cropBox.left, pixel.cropBox.top, pixel.cropBox.width, pixel.cropBox.height);
            context.hiddenCanvasCtx.clearRect(pixel.cropBox.left, pixel.cropBox.top, pixel.cropBox.width, pixel.cropBox.height);
            updateLayoutList();
            updateCanvas();
            Vue.set(pixel.tool, 'value', 'pointer');
        } else if (pixel.tool.value === 'crop' && event.which === 13 && pixel.cropBox.width > 0 && pixel.cropBox.height > 0) {
            if (!confirm(`Do you confirm to apply the crop to Layer ${pixel.currentLayout.value}?`)) {
                Vue.set(pixel.tool, 'value', 'pointer');
                return;
            }
            var currentLayout = getCurrentLayout();
            var currentContext = currentLayout.getContext('2d');
            var imageData = currentContext.getImageData(pixel.cropBox.left, pixel.cropBox.top, pixel.cropBox.width, pixel.cropBox.height);
            currentContext.clearRect(0, 0, 128, 64);
            currentContext.putImageData(imageData, pixel.cropBox.left, pixel.cropBox.top);
            context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
            context.hiddenCanvasCtx.putImageData(imageData, pixel.cropBox.left, pixel.cropBox.top);
            updateLayoutList();
            updateCanvas();
            Vue.set(pixel.tool, 'value', 'pointer');
        } else if (pixel.tool.value === 'crop' && event.which === 46) {
            var currentLayout = getCurrentLayout();
            var currentContext = currentLayout.getContext('2d');
            currentContext.clearRect(pixel.cropBox.left, pixel.cropBox.top, pixel.cropBox.width, pixel.cropBox.height);
            context.hiddenCanvasCtx.clearRect(pixel.cropBox.left, pixel.cropBox.top, pixel.cropBox.width, pixel.cropBox.height);
            updateLayoutList();
            updateCanvas();
            Vue.set(pixel.tool, 'value', 'pointer');
        } else if (pixel.tool.value === 'crop' && event.which === 27) {
            Vue.set(pixel.tool, 'value', 'pointer');
        }
    });

    jQuery(window).resize(function() {
        var newCanvas = getInitialCanvas();
        Vue.set(pixel.scaleRatio, 'value', getInitialScaleRatio());
        for (var key in newCanvas) {
            Vue.set(pixel.canvas, key, newCanvas[key]);
        }
        setTimeout(updateCanvas, 0);
    });

    pixelArray = getPixelArray();
    
    setInterval(function() {
        pixelArray = getPixelArray();
    }, 1000);
}

function drawDot(event) {
    var offset = $('#hiddenCanvas').offset();
    var x = Math.floor((event.pageX - offset.left) / pixel.scaleRatio.value);
    var y = Math.floor((event.pageY - offset.top) / pixel.scaleRatio.value);
    context.hiddenCanvasCtx.fillRect(x, y, 1, 1);
    context.lastMouse = {
        x: x,
        y: y
    };
    updateCanvas();
}

function drawLine(event) {
    var offset = $('#hiddenCanvas').offset();
    var x = Math.floor((event.pageX - offset.left) / pixel.scaleRatio.value);
    var y = Math.floor((event.pageY - offset.top) / pixel.scaleRatio.value);
    context.hiddenCanvasCtx.beginPath();
    context.hiddenCanvasCtx.moveTo(context.lastMouse.x + 0.5, context.lastMouse.y + 0.5);
    context.hiddenCanvasCtx.lineTo(x + 0.5, y + 0.5);
    context.hiddenCanvasCtx.stroke();
    context.lastMouse = {
        x: x,
        y: y
    };
    updateCanvas();
}

function erase(event) {
    var offset = $('#hiddenCanvas').offset();
    var x = Math.floor((event.pageX - offset.left) / pixel.scaleRatio.value);
    var y = Math.floor((event.pageY - offset.top) / pixel.scaleRatio.value);
    context.hiddenCanvasCtx.clearRect(x, y, 1, 1);
    updateCanvas();
}

function updateCanvas() {
    updateCurrentLayout();
    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
    pixel.layouts.forEach(function(item) {
        if (!item.show) {
            return;
        }

        if (item.name === pixel.currentLayout.value) {
            context.hiddenCanvasCtx.drawImage(item.canvas, pixel.currentLayoutOffset.x, pixel.currentLayoutOffset.y);
        } else {
            context.hiddenCanvasCtx.drawImage(item.canvas, 0, 0);
        }
    });
    var data = context.hiddenCanvasCtx.getImageData(0, 0, 128, 64).data;
    for (var y = 0; y < 64; y++) {
        for (var x = 0; x < 128; x++) {
            var i = (y * 128 + x) * 4 + 3;
            if (data[i] > 0) {
                context.CanvasCtx.fillRect(x * pixel.scaleRatio.value, y * pixel.scaleRatio.value, pixel.scaleRatio.value, pixel.scaleRatio.value);
            } else {
                context.CanvasCtx.clearRect(x * pixel.scaleRatio.value, y * pixel.scaleRatio.value, pixel.scaleRatio.value, pixel.scaleRatio.value);
            }
        }
    }
    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
    context.hiddenCanvasCtx.drawImage(getCurrentLayout(), 0, 0);

    if (pixel.showDevKit.value) {
        var bmp = getPixelArray();
        context.screen.clear();
        context.screen.draw(0, 0, 128, 8, bmp);
    }
}

function getInitialScaleRatio() {
    return Math.floor(Math.min(($('body').width() - 280) / 128, ($('body').height() - 77) / 64));
}

function getInitialCanvas() {
    var scaleRatio = getInitialScaleRatio();
    return {
        width: 128 * scaleRatio,
        height: 64 * scaleRatio,
        top: Math.round(($('body').height() - 66 - 64 * scaleRatio) / 2 + 25),
        left: Math.round(($('body').width() - 249 - 128 * scaleRatio) / 2 + 66)
    }
}

function zoom(type) {
    if (pixel.tool.value === 'pointer') {
        checkOffset();
    }

    if (type === undefined) {
        var scaleRatio = getInitialScaleRatio();
        var canvasCenter = {
            x: Math.round(($('body').width() - 249 - 128 * scaleRatio) / 2 + 66) + 128 * scaleRatio / 2,
            y: Math.round(($('body').height() - 66 - 64 * scaleRatio) / 2 + 25) + 64 * scaleRatio / 2
        };
    } else {
        var canvasCenter = {
            x: pixel.canvas.left + pixel.canvas.width / 2,
            y: pixel.canvas.top + pixel.canvas.height / 2
        };
        var scaleRatio = pixel.scaleRatio.value * (type === 0 ? 2 : 0.5);
        var initialScaleRatio = getInitialScaleRatio();
        if (scaleRatio > initialScaleRatio * 4 || scaleRatio < initialScaleRatio * 0.25) {
            return;
        }
    }
    
    Vue.set(pixel.canvasScaleRatio, 'value', scaleRatio * 100 / initialScaleRatio)
    Vue.set(pixel.scaleRatio, 'value', scaleRatio);
    Vue.set(pixel.canvas, 'width', 128 * scaleRatio);
    Vue.set(pixel.canvas, 'height', 64 * scaleRatio);
    Vue.set(pixel.canvas, 'left', canvasCenter.x - 64 * scaleRatio);
    Vue.set(pixel.canvas, 'top', canvasCenter.y - 32 * scaleRatio);
    setTimeout(updateCanvas, 0);
}

function zoomIn() {
    zoom(0);
}

function zoomOut() {
    zoom(1);
}

function moveCanvas() {
    var current
}

function createLayout() {
    var newLayout = $('<canvas width="128" height="64" id="_layout_' + context.createdLayoutCount + '"></canvas>');
    $('#layoutContext').append(newLayout);
    pixel.layouts.push({
        name: context.createdLayoutCount,
        show: true,
        canvas: newLayout.get(0)
    });
    Vue.set(pixel.currentLayout, 'value', context.createdLayoutCount);
    Vue.set(pixel.currentLayout, 'show', true);
    context.createdLayoutCount++;
    updateLayoutList();
    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
}

function getCurrentLayout() {
    for (var i = 0; i < pixel.layouts.length; ++i) {
        if (pixel.layouts[i].name === pixel.currentLayout.value) {
            return pixel.layouts[i].canvas;
        }
    }
    return null;
}

function updateCurrentLayout(left, top) {
    left = left || 0;
    top = top || 0;

    var currentLayout = getCurrentLayout();
    currentLayout.getContext("2d").clearRect(0, 0, 128, 64);
    currentLayout.getContext("2d").drawImage($('#hiddenCanvas').get(0), left, top);
    updateLayoutList();
}

function updateLayoutList() {
    var newLayoutList = [];
    for (var i = 0; i < pixel.layouts.length; ++i) {
        var name = pixel.layouts[i].name;
        var show = pixel.layouts[i].show;
        var image = pixel.layouts[i].canvas.toDataURL();
        
        newLayoutList.push({
            name: name,
            show: show,
            image: image
        });
    }

    Vue.set(pixel.layoutList, 'value', newLayoutList);
}

function selectLayout(layoutName) {
    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
    Vue.set(pixel.currentLayout, 'value', layoutName);
    for (var i = 0; i < pixel.layouts.length; ++i) {
        if (pixel.layouts[i].name === pixel.currentLayout.value) {
            Vue.set(pixel.currentLayout, 'show', pixel.layouts[i].show);
            break;
        }
    }
    context.hiddenCanvasCtx.drawImage(getCurrentLayout(), 0, 0);
}

function isCurrent(layoutName) {
    return layoutName === pixel.currentLayout.value ? 'true' : 'false';
}

function copyLayout() {
    if (pixel.tool.value === 'pointer') {
        checkOffset();
    }
    
    var _currentLayout = getCurrentLayout();
    createLayout();
    var currentLayout = getCurrentLayout();
    currentLayout.getContext("2d").drawImage(_currentLayout, 0, 0);
    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
    context.hiddenCanvasCtx.drawImage(_currentLayout, 0, 0);
    updateLayoutList();
    updateCanvas();
}

function removeLayout() {
    if (pixel.layouts.length === 1) {
        alert('This is the last layout, and it cannot be removed.');
        return;
    }

    if (!confirm(`Do you want to remove Layer ${pixel.currentLayout.value}? You cannot roll back this action.`)) {
        return;
    }

    for (var i = 0; i < pixel.layouts.length; ++i) {
        if (pixel.layouts[i].name === pixel.currentLayout.value) {
            break;
        }
    }
    
    if (i >= pixel.layouts.length) {
        return;
    }

    pixel.layouts.splice(i, 1);
    $('#_layout_' + pixel.currentLayout.value).remove();
    updateLayoutList();
    selectLayout(pixel.layouts[0].name);
    updateCanvas();
}

function checkOffset() {
    var canvas = getCurrentLayout();
    var image = new Image();
    image.src = canvas.toDataURL();
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 128, 64);
    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
    context.hiddenCanvasCtx.drawImage(image, 0, 0);
    pixel.currentLayoutOffset = {
        x: 0,
        y: 0
    };
    updateLayoutList();
    updateCanvas();
}

function getPixelArray() {
    var hiddenImageSrc = document.getElementById('hiddenCanvas').toDataURL();

    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
    pixel.layouts.forEach(function(item) {
        if (item.show) {
            context.hiddenCanvasCtx.drawImage(item.canvas, 0, 0);
        }
    });
    var imageData = context.hiddenCanvasCtx.getImageData(0, 0, 128, 64).data;
    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);
    
    var hiddenImage = new Image();
    hiddenImage.onload = function() {
        context.hiddenCanvasCtx.drawImage(hiddenImage, 0, 0);
    };
    hiddenImage.src = hiddenImageSrc;
    
    var sortedData = [];
    var index;
    for (var y = 0; y < 64; y++) {
        for (var x = 0; x < 128; x++) {
            index = Math.floor(y / 8) * 8 * 128 + x * 8 + y % 8;
            sortedData[index] = imageData[(y * 128 + x) * 4 + 3] > 0 ? 1 : 0;
        }
    }
    var data = [];
    var bin = '';
    
    for(var i = 0; i < 64 * 128; i++) {
        if (i > 0 && i % 8 === 0) {
            data.push(parseInt(bin, 2));
            bin = '';
        }
        bin = (sortedData[i] ? '1' : '0') + bin;
    }
    data.push(parseInt(bin, 2));
    return data;
}

function getPixelData() {
    var data = getPixelArray();
    var res = '';
    var line = '\n/* Row 0 */\n';
    var hex;
    for(var i = 0; i < data.length; i++) {
        if (i > 0 && i % 16 === 0) {
            res += (line + '\n');
            line = '';
            if (i % 128 === 0) {
                res += (`/* Row ${i / 128} */\n`);
            }
        } else if (i > 0 && i % 8 === 0) {
            line += ' ';
        }
        hex = data[i].toString(16);
        line += ('0x' + (hex.length < 2 ? ('0' + hex) : hex) + ',');
    }
    res += (line);
    return 'static const unsigned char img[] = {' + res.substr(0, res.length - 1) + '};';
}

function getPixelCode() {
    Vue.set(pixel.code, 'value', getPixelData());
    Vue.set(pixel.code, 'show', true);
}

function closeCode() {
    Vue.set(pixel.code, 'show', false);
}

function closeIcons() {
    Vue.set(pixel.tool, 'value', 'pointer');
}

function closePicture() {
    pixel.insertedImage = {
        width: 0,
        height: 0,
        _width: 0,
        _height: 0,
        threshold: 128,
        image: null
    };

    var previewCanvas = document.getElementById('preview_canvas');
    var previewContext = previewCanvas.getContext('2d');
    previewContext.clearRect(0, 0, 440, 320);
    var thresholdCanvas = document.getElementById('threshold_canvas');
    var thresholdContext = thresholdCanvas.getContext('2d');
    thresholdContext.clearRect(0, 0, 256, 80);

    Vue.set(pixel.tool, 'value', 'pointer');
}

function initPreviewImage() {
    var image = pixel.insertedImage.image;
    var _width = image.width;
    var _height = image.height;

    Vue.set(pixel.insertedImage, '_width', _width);
    Vue.set(pixel.insertedImage, '_height', _height);
    Vue.set(pixel.insertedImage, 'threshold', 128);

    if (_width <= 128 && _height <= 64) {
        var width = _width;
        var height = _height;
    } else if (48 / _height * _width > 128) {
        var width = 128;
        var height = Math.round(width / _width * _height);
    } else {
        var height = 64;
        var width = Math.round(height / _height * _width);
    }

    updatePreviewCachedImage(width, height);
}

function updatePreviewCachedImage(width, height) {
    var image = pixel.insertedImage.image;
    Vue.set(pixel.insertedImage, 'width', width);
    Vue.set(pixel.insertedImage, 'height', height);

    var cacheCanvas = document.getElementById('preview_cache_canvas');
    cacheCanvas.width = width;
    cacheCanvas.height = height;
    var cacheContext = cacheCanvas.getContext('2d');
    cacheContext.drawImage(image, 0, 0, width, height);
    var imageData = cacheContext.getImageData(0, 0, width, height);
    var data = imageData.data;
    var thresholdData = [];
    for (var i = 0; i <= 255; i++) {
        thresholdData[i] = 0;
    }

    var maxThreshold = 0;
    for (var i = 0; i < data.length; i += 4) {
        var brightness = Math.round(0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]);
        if (brightness > 255) {
            brightness = 255;
        }
        if (brightness === 255) {
            data[i + 3] = 0;
        }

        if (data[i + 3] === 0) {
            brightness = 255;
        }

        ++thresholdData[brightness];
        maxThreshold = Math.max(thresholdData[brightness], maxThreshold);
    }

    var thresholdCanvas = document.getElementById('threshold_canvas');
    var thresholdContext = thresholdCanvas.getContext('2d');
    thresholdContext.clearRect(0, 0, 256, 80);
    thresholdContext.strokeStyle = "#000000";
    for (var i = 0; i <= 255; ++i) {
        thresholdContext.beginPath();
        thresholdContext.moveTo(i + 0.5, 80);
        thresholdContext.lineTo(i + 0.5, 85 - Math.round(thresholdData[i] / maxThreshold * 80));
        thresholdContext.stroke();
    }

    cacheContext.putImageData(imageData, 0, 0);
    updatePreviewCanvas(width, height);
}

function updatePreviewCanvas(width, height) {
    var cacheCanvas = document.getElementById('preview_cache_canvas');
    var previewCanvas = document.getElementById('preview_canvas');
    var previewContext = previewCanvas.getContext('2d');
    var scaleRatio = Math.min(440 / width, 320 / height);
    if (width / 440 * 320 > height) {
        var _width = 440;
        var _height = 440 / width * height;
        var _left = 0;
        var _top = (320  - _height) / 2;
    } else {
        var _width = 320 / height * width;
        var _height = 320;
        var _left = (440 - _width) / 2;
        var _top = 0;
    }
    previewContext.clearRect(0, 0, 440, 320);
    previewContext.drawImage(cacheCanvas, 0, 0, width, height, _left, _top, _width, _height);

    var imageData = previewContext.getImageData(0, 0, 440, 320);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var brightness = data[i];
        data[i] = data[i + 1] = data[i + 2] = 0;
        if (brightness <= pixel.insertedImage.threshold && data[i + 3] > 0) {
            data[i + 3] = 255;
        } else {
            data[i + 3] = 0;
        }
    }
    previewContext.putImageData(imageData, 0, 0);
}

function updatePictureSize(width, height) {
    if (width !== null) {
        height = Math.round(width / pixel.insertedImage._width * pixel.insertedImage._height);
    } else {
        width = Math.round(height / pixel.insertedImage._height * pixel.insertedImage._width);
    }

    Vue.set(pixel.insertedImage, 'width', width);
    Vue.set(pixel.insertedImage, 'height', height);

    updatePreviewCachedImage(width, height);
}

function insertImage() {
    var cacheCanvas = document.getElementById('preview_cache_canvas');
    var cacheContext = cacheCanvas.getContext('2d');
    var imageData = cacheContext.getImageData(0, 0, pixel.insertedImage.width, pixel.insertedImage.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var brightness = data[i];
        data[i] = data[i + 1] = data[i + 2] = 0;
        if (brightness <= pixel.insertedImage.threshold && data[i + 3] > 0) {
            data[i + 3] = 255;
        } else {
            data[i + 3] = 0;
        }
    }
    cacheContext.putImageData(imageData, 0, 0);

    var left = Math.round((128 - pixel.insertedImage.width) / 2);
    var top = Math.round((64 - pixel.insertedImage.height) / 2);
    var currentLayout = getCurrentLayout();
    currentLayout.getContext("2d").drawImage(cacheCanvas, left, top);
    context.hiddenCanvasCtx.drawImage(cacheCanvas, left, top);
    updateLayoutList();
    updateCanvas();
    closePicture();
}

function mergeLayout() {
    if (pixel.tool.value === 'pointer') {
        checkOffset();
    }

    if (!confirm('Do you confirm to merge all layers?')) {
        return;
    }
    context.hiddenCanvasCtx.clearRect(0, 0, 128, 64);

    for (var i = 0; i < pixel.layouts.length; ++i) {
        var item = pixel.layouts[i];
        if (item.show) {
            context.hiddenCanvasCtx.drawImage(item.canvas, 0, 0);
            pixel.layouts.splice(i, 1);
            $('#_layout_' + item.name).remove();
            --i;
        }
    }

    var imageData = context.hiddenCanvasCtx.getImageData(0, 0, 128, 64);
    
    createLayout();
    var currentLayout = getCurrentLayout();
    currentLayout.getContext('2d').putImageData(imageData, 0, 0);
    context.hiddenCanvasCtx.putImageData(imageData, 0, 0);
    updateLayoutList();
    updateCanvas();
}

function showLayout(layoutName) {
    if (pixel.tool.value === 'pointer') {
        checkOffset();
    }

    for (var i = 0; i < pixel.layouts.length; i++) {
        if (pixel.layouts[i].name === layoutName) {
            Vue.set(pixel.layouts[i], 'show', !pixel.layouts[i].show);
            break;
        }
    }

    for (var i = 0; i < pixel.layouts.length; ++i) {
        if (pixel.layouts[i].name === pixel.currentLayout.value) {
            Vue.set(pixel.currentLayout, 'show', pixel.layouts[i].show);
            break;
        }
    }

    updateLayoutList();
    updateCanvas();
}

function invertLayout() {
    if (pixel.tool.value === 'pointer') {
        checkOffset();
    }

    var currentLayout = getCurrentLayout();
    var currentContext = currentLayout.getContext('2d');
    var imageData = currentContext.getImageData(0, 0, 128, 64);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
            data[i + 3] =  0;
        } else {
            data[i] = data[i + 1] = data[i + 2] = 0;
            data[i + 3] = 255;
        }
    }
    currentContext.putImageData(imageData, 0, 0);
    context.hiddenCanvasCtx.putImageData(imageData, 0, 0);
    updateLayoutList();
    updateCanvas();
}

function save() {
    if (pixel.tool.value === 'pointer') {
        checkOffset();
    }

    var blob = new Blob([LZString.compressToUint8Array(getDevKitPixelData())], {type: "application/octet-stream"});
    saveAs(blob, 'devkit-oled-pixel.dkp');
}

function getDevKitPixelData() {
    var dkpObj = {
        createdLayoutCount: context.createdLayoutCount,
        layouts: []
    }

    pixel.layouts.forEach(function(item) {
        dkpObj.layouts.push({
            name: item.name,
            show: item.show,
            data: item.canvas.toDataURL()
        });
    });

    return JSON.stringify(dkpObj);
}

function syncImageToLayouts(dkpObj, index) {
    if (!index) {
        index = 0;
    }
    
    var item = dkpObj.layouts[index];

    if (!item) {
        context.createdLayoutCount = dkpObj.createdLayoutCount;
        selectLayout(pixel.layouts[0].name);
        updateCanvas();
        zoom();
        return;
    }

    context.createdLayoutCount = item.name;
    createLayout();

    if (!item.show) {
        showLayout(item.name);
    }
    
    var image = new Image();
    image.onload = function() {
        context.hiddenCanvasCtx.drawImage(image, 0, 0);
        updateCurrentLayout();
        syncImageToLayouts(dkpObj, index + 1);
    };
    image.src = item.data;
}

function loadData(dkpObj) {
    pixel.layouts = [];
    pixel.layoutList = {
        value: []
    };

    $('#layoutContext').empty();

    syncImageToLayouts(dkpObj);
}

function openFile() {
    $('#open_file').click();
}

function showDevKitPreview() {
    if (!pixel.showDevKit.value) {
        checkOffset();
        var bmp = getPixelArray();
        context.screen.clear();
        context.screen.draw(0, 0, 128, 8, bmp);
    }
    Vue.set(pixel.showDevKit, 'value', !pixel.showDevKit.value);
}

function insertIcon(code) {
    createLayout();
    var currentLayout = getCurrentLayout();
    var ctx = currentLayout.getContext("2d");
    ctx.font = `${pixel.icons.size}px FontAwesome`;
    ctx.textBaseline = 'bottom';

    var iconString = String.fromCharCode(`0xf${code}`);
    var iconWidth = ctx.measureText(iconString).width
    ctx.fillText(iconString, Math.floor((128 - iconWidth) / 2), Math.floor((64 + Number(pixel.icons.size)) / 2));

    var imageData = ctx.getImageData(0, 0, 128, 64);
    var data = imageData.data;
    for (var y = 0; y < 64; y++) {
        for (var x = 0; x < 128; x++) {
            var i = (y * 128 + x) * 4 + 3;
            data[i] = data[i] > 120 ? 255 : 0;
        }
    }

    context.hiddenCanvasCtx.putImageData(imageData, 0, 0);
    updateLayoutList();
    updateCanvas();
    closeIcons();
}

function insertVSIcon(index) {
    var DOMURL = window.URL || window.webkitURL || window;
    
    var img = new Image();
    var url = 'vsicons/' + vsIconName(index);

    img.onload = function() {
        createLayout();
        var currentLayout = getCurrentLayout();
        var ctx = currentLayout.getContext("2d");
        ctx.drawImage(img, Math.floor((128 - pixel.icons.size) / 2), Math.floor((64 - Number(pixel.icons.size)) / 2), pixel.icons.size, pixel.icons.size);

        var imageData = ctx.getImageData(0, 0, 128, 64);
        var data = imageData.data;
        for (var y = 0; y < 64; y++) {
            for (var x = 0; x < 128; x++) {
                var i = (y * 128 + x) * 4 + 3;
                data[i] = (data[i] > 120 && (data[i - 1] + data[i - 2] + data[i - 3]) / 3 < 128) ? 255 : 0;
                data[i - 1] = data[i - 2] = data[i - 3] = 0;
            }
        }
    
        context.hiddenCanvasCtx.putImageData(imageData, 0, 0);
        updateLayoutList();
        updateCanvas();
        closeIcons();
    }
      
    img.src = url;
}

function vsIconName(index) {
    index = index.toString();
    for (var i = index.length; i < 4; i++) {
        index = '0' + index;
    }

    return `icon${index}.svg`;
}

function liveView(row) {
    if (!pixel.devkitIP.value) {
        alert('no devkit ip');
        return;
    }

    row = isNaN(row) ? 0 : Number(row);

    if (row >= 16) {
        var row = 0;
        liveInterval = setInterval(function() {
            if (context.shouldMove && pixel.tool.value === 'pointer') {
                return;
            }
            checkLiveViewRow(pixel.devkitIP.value, row++);
            row %= 16;
        }, 10);
        
        return;
    }

    updateLiveViewRow(pixel.devkitIP.value, row, function(err) {
        setTimeout(function() {liveView(err ? row : (row + 1))}, 10);
    });
}

function updateLiveViewRow(ip, row, callback) {
    var data = pixelArray;
    var rowList = 'ABCDEFGHIJKLMNOP';
    var index = rowList[row];
    var str = '';

    liveBuffer[index] = liveBuffer[index] || [];

    for (var i = 0; i < 64; i++) {
        str += String.fromCharCode(data[i + row * 64]);
        liveBuffer[index][i] = data[i + row * 64];
    }

    var bmp = btoa(str).replace(/\//g, '-')
                       .replace(/\+/g, '*')
                       .replace(/=/g, '_');
    var url = `http://${ip}/?r=${index}&b=${bmp}`;
    var dummyScript = document.createElement('script');
    dummyScript.src = url;
    dummyScript.onload = function() {
        document.body.removeChild(dummyScript);
        if (callback) {
            callback(0);
        }
    }
    dummyScript.onerror = function() {
        document.body.removeChild(dummyScript);
        if (callback) {
            callback(1);
        }
    }
    document.body.appendChild(dummyScript);
}

function checkLiveViewRow(ip, row) {
    var data = pixelArray;
    var rowList = 'ABCDEFGHIJKLMNOP';
    var index = rowList[row];

    liveBuffer[index] = liveBuffer[index] || [];

    for (var i = 0; i < 64; i++) {
        if (data[i + row * 64] !== liveBuffer[index][i]) {
            updateLiveViewRow(ip, row, function(err) {
                if (err) {
                    clearInterval(liveInterval);
                    setTimeout(updateDevKitIP, 1000);
                }
            });
            break;
        }
    }
}

function updateDevKitIP() {
    clearInterval(liveInterval);

    var url = `http://${pixel.devkitIP.buffer}/`;
    var dummyScript = document.createElement('script');
    dummyScript.src = url;
    Vue.set(pixel.devkitIP, 'info', 'Connecting to DevKit...');
    dummyScript.onload = function() {
        Vue.set(pixel.devkitIP, 'show', false);
        Vue.set(pixel.devkitIP, 'value', pixel.devkitIP.buffer);
        Vue.set(pixel.devkitIP, 'info', 'Connected to DevKit.');
        liveView();
    }
    dummyScript.onerror = function() {
        document.body.removeChild(dummyScript);
        Vue.set(pixel.devkitIP, 'info', 'Cannot connect to DevKit.');
    }
    document.body.appendChild(dummyScript);
}

function closeDevKitIP() {
    Vue.set(pixel.devkitIP, 'show', false);
}

function showDevKitIP() {
    Vue.set(pixel.devkitIP, 'show', true);
}

jQuery(document).ready(init);
jQuery(document).contextmenu(function() {
    return false;
});
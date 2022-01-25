import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water';
import { Sky } from 'three/examples/jsm/objects/Sky';

//Types
import { Redirector } from '../utils/interfaces';

//Services
import { isMobileView, isStringValid, OnObjectHover } from '../utils/services';

//Assets
import waterNormals from '../assets/images/formals/waternormals';

export interface RouteMapProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
	pinpoints: Redirector[];
}

const RouteMap = ({ pinpoints, className }: RouteMapProps) => {
	const [isMapVisible, setIsMapVisible] = React.useState<boolean>(false);
	const [wasRendered, setWasRendered] = React.useState<boolean>(false);
	const [isMobile, setIsMobile] = React.useState<boolean>(isMobileView(window.innerWidth));
	const mapElement = React.useRef<HTMLUListElement>(null);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (mapElement && mapElement.current) {
			const waveDataList = {
				A: {
					direction: 0,
					steepness: 0.4,
					wavelength: 60,
				},
				B: {
					direction: 30,
					steepness: 0.4,
					wavelength: 30,
				},
				C: {
					direction: 60,
					steepness: 0.4,
					wavelength: 15,
				},
			};

			let container: HTMLUListElement, raycaster: THREE.Raycaster, mouse: THREE.Vector2;
			let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
			let water: Water, sun: THREE.Vector3, boxList: THREE.Object3D[];
			let clock: THREE.Clock, boxCount: number, delta: number;

			const init = () => {
				mouse = new THREE.Vector2();
				container = mapElement.current as HTMLUListElement;
				renderer = new THREE.WebGLRenderer();

				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(window.innerWidth, window.innerHeight);
				renderer.toneMapping = THREE.ACESFilmicToneMapping;

				container.appendChild(renderer.domElement);

				scene = new THREE.Scene();
				camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);

				camera.position.set(0, 300, 0);
				camera.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);

				sun = new THREE.Vector3();

				const boxGeometry = new THREE.BoxGeometry(10, 10, 10);

				boxCount = pinpoints.length;
				boxList = [];

				for (let i = 0; i < boxCount; i++) {
					const box = new THREE.Mesh(
						boxGeometry,
						new THREE.MeshStandardMaterial({
							roughness: 0,
							color: 0x000000,
						}),
					);

					box.position.set(i * 10, 0, i * 10);
					box.name = pinpoints[i].path;

					scene.add(box);
					boxList.push(box);
				}

				const waterGeometry = new THREE.PlaneGeometry(1024, 768, 512, 512);

				water = new Water(waterGeometry, {
					textureWidth: 512,
					textureHeight: 512,
					waterNormals: new THREE.TextureLoader().load(waterNormals, (texture) => {
						texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					}),
					sunDirection: new THREE.Vector3(),
					sunColor: 0xffffff,
					waterColor: 0x60abb4,
					distortionScale: 3.7,
					fog: scene.fog !== undefined,
				});

				water.rotation.x = -Math.PI / 2;
				water.material.onBeforeCompile = (shader) => {
					shader.uniforms.waveA = {
						value: [
							Math.sin((waveDataList.A.direction * Math.PI) / 180),
							Math.cos((waveDataList.A.direction * Math.PI) / 180),
							waveDataList.A.steepness,
							waveDataList.A.wavelength,
						],
					};

					shader.uniforms.waveB = {
						value: [
							Math.sin((waveDataList.B.direction * Math.PI) / 180),
							Math.cos((waveDataList.B.direction * Math.PI) / 180),
							waveDataList.B.steepness,
							waveDataList.B.wavelength,
						],
					};

					shader.uniforms.waveC = {
						value: [
							Math.sin((waveDataList.C.direction * Math.PI) / 180),
							Math.cos((waveDataList.C.direction * Math.PI) / 180),
							waveDataList.C.steepness,
							waveDataList.C.wavelength,
						],
					};

					const vertexShaderComponent = document.getElementById('vertexShader');
					const fragmentShaderComponent = document.getElementById('fragmentShader');

					if (vertexShaderComponent && vertexShaderComponent.textContent) {
						shader.vertexShader = vertexShaderComponent.textContent;
					}

					if (fragmentShaderComponent && fragmentShaderComponent.textContent) {
						shader.fragmentShader = fragmentShaderComponent.textContent;
					}
				};

				scene.add(water);

				const sky: Sky = new Sky();

				sky.scale.setScalar(10000);

				scene.add(sky);

				const skyUniforms = sky.material.uniforms;

				skyUniforms['turbidity'].value = 10;
				skyUniforms['rayleigh'].value = 2;
				skyUniforms['mieCoefficient'].value = 0.005;
				skyUniforms['mieDirectionalG'].value = 0.8;

				const parameters = {
					elevation: 12,
					azimuth: 63,
				};
				const pmremGenerator = new THREE.PMREMGenerator(renderer);

				(() => {
					const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
					const theta = THREE.MathUtils.degToRad(parameters.azimuth);

					sun.setFromSphericalCoords(1, phi, theta);

					/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
					sky.material.uniforms['sunPosition'].value.copy(sun);

					water.material.uniforms['sunDirection'].value.copy(sun).normalize();
					/* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					scene.environment = pmremGenerator.fromScene(sky).texture;
				})();

				window.addEventListener('resize', onWindowResize);

				renderer.domElement.addEventListener('click', (event) => {
					OnObjectHover(
						event,
						renderer,
						mouse,
						raycaster,
						camera,
						boxList,
						(hoverEvent, hoveredIntersection) => {
							if (
								hoveredIntersection.length > 0 &&
								pinpoints.find((pinpoint) => pinpoint.path === hoveredIntersection[0].object.name)
							) {
								navigate(hoveredIntersection[0].object.name, { replace: false });
							}
						},
					);
				});

				renderer.domElement.addEventListener('mousemove', (event) => {
					OnObjectHover(
						event,
						renderer,
						mouse,
						raycaster,
						camera,
						boxList,
						(hoverEvent, hoverIntersection) => {
							if (
								hoverIntersection.length > 0 &&
								pinpoints.find((pinpoint) => pinpoint.path === hoverIntersection[0].object.name)
							) {
								if (renderer.domElement.style.cursor === '') {
									renderer.domElement.style.cursor = 'pointer';
								}
							} else {
								if (renderer.domElement.style.cursor === 'pointer') {
									renderer.domElement.style.cursor = '';
								}
							}
						},
					);
				});

				clock = new THREE.Clock();
			};

			const onWindowResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize(window.innerWidth, window.innerHeight);
			};

			const render = () => {
				renderer.render(scene, camera);
			};

			const animate = () => {
				requestAnimationFrame(animate);

				delta = clock.getDelta();

				water.material.uniforms['time'].value += delta;

				render();
			};

			init();
			animate();
		}
	}, []);

	React.useEffect(() => {
		window.addEventListener('resize', () => setIsMobile(isMobileView(window.innerWidth)));

		return () => {
			window.removeEventListener('resize', () => setIsMobile(isMobileView(window.innerWidth)));
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	const onVisibilityControlButtonClick = () => {
		setIsMapVisible(!isMapVisible);

		if (wasRendered === false) {
			setWasRendered(true);
		}
	};

	return (
		<nav
			className={className && isStringValid(className) ? `route-map ${className}` : 'route-map'}
			data-is-mobile={isMobile}
			data-has-expanded={isMapVisible}
		>
			<button
				className='route-map__view --rasterized-button'
				onClick={isMapVisible ? undefined : onVisibilityControlButtonClick}
			>
				<ul ref={mapElement} className='route-map__view-path' />
			</button>
			<button className='route-map__button --fade-in' onClick={onVisibilityControlButtonClick}>
				Hide
			</button>
		</nav>
	);
};

export default RouteMap;

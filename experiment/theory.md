### Theory

### Carrying Capacity (K):
The maximum population size that an environment can sustain indefinitely, given the available resources such as food, habitat, water, and other necessities.

#### Introduction to Logistic Growth
Logistic growth models describe how a population grows in an environment with limited resources and intraspecific competition (competition among individuals of the same species). Unlike exponential growth, which assumes unlimited resources, logistic growth slows as the population approaches the environment's carrying capacity.

This type of growth produces an S-shaped curve (sigmoid curve). Initially, the population grows exponentially, but as resources become limited, the growth rate slows and eventually levels off.

"Logistic models are density-dependent, where the growth rate equals the birth rate minus the death rate." — Stone, 1980

&nbsp;

#### Exponential Growth Model (Unlimited Resources)
When resources are unlimited, population growth is proportional to the current population:

dPdt=rP\frac{dP}{dt} = rPdtdP=rP 
P: Population size

t: Time

r: Intrinsic rate of growth


The solution to this differential equation is:

P(t)=P0ertP(t) = P_0 e^{rt}P(t)=P0ert 

where P0P_0P0 is the initial population.

#### Logistic Growth Model (Limited Resources)
As the population grows and resources become limited, the growth rate decreases:

dNdt=rN(1−NK)\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)dtdN=rN(1−KN) 

N: Population size

r: Maximum per capita growth rate

K: Carrying capacity

This logistic model accounts for the slowing of growth as population size NNN approaches KKK.

#### Graphical Representation

Exponential Growth (Magenta Curve): Grows without bound.

Logistic Growth (Orange Curve): Grows initially like exponential but slows down as it nears carrying capacity KKK.

As N≪KN \ll KN≪K, the logistic and exponential models behave similarly. As N→KN \rightarrow KN→K, the growth rate approaches zero.

#### Logistic Equation Dynamics

The logistic equation resembles a parabolic function and can exhibit complex dynamics, especially in discrete form. It has been historically important in understanding biological population growth (Verhulst, 1845). Kingsland (1980s) discussed its applications, successes, and failures in ecology.

##### 1. Discrete Logistic Growth

In discrete time steps, the logistic growth equation is:

Nt+1=Nt+RmNt(K−NtK)N_{t+1} = N_t + R_m N_t \left(\frac{K - N_t}{K}\right)Nt+1=Nt+RmNt(KK−Nt) 
NtN_tNt: Current population

Nt+1N_{t+1}Nt+1: Next generation population

RmR_mRm: Maximum growth rate

K: Carrying capacity

As Nt≪KN_t \ll KNt≪K, K−NtK≈1\frac{K - N_t}{K} \approx 1KK−Nt≈1, leading to near-geometric growth. Growth slows as NtN_tNt approaches KKK.

Alternate interpretation in terms of biological traits:

K=R−1aK = \frac{R - 1}{a}K=aR−1 

R: Intrinsic rate of increase

a: Susceptibility to crowding

##### 2. Continuous Logistic Growth

In continuous time, the logistic equation becomes:

dNdt=rN(1−NK)\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)dtdN=rN(1−KN) 

This model assumes a continuous reproduction process, where the reproduction rate decreases linearly with population size.

